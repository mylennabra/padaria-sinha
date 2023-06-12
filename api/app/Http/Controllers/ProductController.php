<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $products = Product::query()
            ->when($request->query('code'), fn ($query, $code) => $query->byCode($code))
            ->when($request->query('description'), fn ($query, $code) => $query->byDescription($code))
            ->when($request->query('group'), fn ($query, $code) => $query->byGroup($code))
            ->get();

        return response()->json([
            'data' => [
                'products' => ProductResource::collection($products)->resolve(),
                'groups' => Product::all('group')->pluck('group')->toArray(),
            ]
        ]);
    }

    public function store(StoreProductRequest $request): JsonResource
    {
        return ProductResource::make(Product::create($request->all()));
    }

    public function show(Request $request, Product $product): JsonResource
    {
        return ProductResource::make($product);
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResource
    {
        $product->update($request->all());
        return ProductResource::make($product->fresh());
    }

    public function delete(Request $request, Product $product): Response
    {
        $product->deleteOrFail();
        return response()->noContent();
    }
}
