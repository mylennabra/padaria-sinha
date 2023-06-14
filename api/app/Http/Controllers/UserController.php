<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserController extends Controller
{
    public function me(Request $request): JsonResource
    {
        return UserResource::make($request->user());
    }

    public function index(Request $request): JsonResource
    {
        $users = User::query()
            ->when($request->query('name'), fn ($query, $name) => $query->byName($name))
            ->when($request->query('email'), fn ($query, $login) => $query->byLogin($login))
            ->get();

        return UserResource::collection($users);
    }

    public function show(Request $request, User $user): JsonResource
    {
        return UserResource::make($user);
    }

    public function store(StoreUserRequest $request): JsonResource
    {
        return UserResource::make(User::create($request->all()));
    }

    public function update(UpdateUserRequest $request, User $user): JsonResource
    {
        $user->update([$request->all()]);

        return UserResource::make($user->fresh());
    }
}
