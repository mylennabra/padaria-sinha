<?php

namespace App\Http\Controllers;

use App\Http\Requests\Recipe\StoreRecipeRequest;
use App\Http\Requests\Recipe\UpdateRecipeRequest;
use App\Http\Resources\RecipeResource;
use App\Models\Product;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class RecipeController extends Controller
{
    public function index(Request $request): JsonResource
    {
        $recipes = Recipe::query()
            ->when($request->query('code'), fn ($query, $code) => $query->byCode($code))
            ->when($request->query('name'), fn ($query, $code) => $query->byName($code))
            ->get();

        return RecipeResource::collection($recipes);
    }

    public function store(StoreRecipeRequest $request): JsonResource
    {
        $request->get('feed_stocks')->each(function ($feed_stock) {
            if (!Product::byDescription($feed_stock)->exists()) {
                Product::create([
                    'description' => $feed_stock->name,
                    'stock' => $feed_stock->amount,
                    'unit' => $feed_stock->unit,
                    'group' => '',
                    'price' => 0,
                ]);
            }
        });

        return RecipeResource::make(Recipe::create($request->except(['feed_stocks'])));
    }

    public function show(Request $request, Recipe $Recipe): JsonResource
    {
        return RecipeResource::make($Recipe);
    }

    public function update(UpdateRecipeRequest $request, Recipe $Recipe): JsonResource
    {
        $Recipe->update($request->all());
        return RecipeResource::make($Recipe->fresh());
    }

    public function delete(Request $request, Recipe $Recipe): Response
    {
        $Recipe->deleteOrFail();
        return response()->noContent();
    }
}
