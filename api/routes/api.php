<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/me', [UserController::class, 'me'])->name('me');

Route::prefix('/users')->name('users')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('.get');
    Route::get('/{user}', [UserController::class, 'show'])->name('.show');
    Route::post('/', [UserController::class, 'store'])->name('.post');
    Route::put('/{user}', [UserController::class, 'update'])->name('.update');
});


Route::prefix('/clients')->name('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->name('.get');
    Route::get('/{client}', [ClientController::class, 'show'])->name('.show');
    Route::post('/', [ClientController::class, 'store'])->name('.post');
    Route::put('/{client}', [ClientController::class, 'update'])->name('.update');
    Route::delete('/{client}', [ClientController::class, 'delete'])->name('.delete');
});

Route::prefix('/products')->name('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('.get');
    Route::get('/{product}', [ProductController::class, 'show'])->name('.show');
    Route::post('/', [ProductController::class, 'store'])->name('.post');
    Route::put('/{product}', [ProductController::class, 'update'])->name('.update');
    Route::delete('/{product}', [ProductController::class, 'delete'])->name('.delete');
});

Route::prefix('/recipes')->name('recipes')->group(function () {
    Route::get('/', [RecipeController::class, 'index'])->name('.get');
    Route::get('/{recipe}', [RecipeController::class, 'show'])->name('.show');
    Route::post('/', [RecipeController::class, 'store'])->name('.post');
    Route::put('/{recipe}', [RecipeController::class, 'update'])->name('.update');
    Route::delete('/{recipe}', [RecipeController::class, 'delete'])->name('.delete');
});
