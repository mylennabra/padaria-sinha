<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::whereEmail($request->get('email'))->first();

        if (is_null($user)) {
            return response()->json([
                'message' => 'Login inválido',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user->createToken('auth_token')->plainTextToken;

        return response()->json(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
