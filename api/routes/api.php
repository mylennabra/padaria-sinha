<?php

use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/clients')->name('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->name('.get');
    Route::get('/{client}', [ClientController::class, 'show'])->name('.show');
    Route::post('/', [ClientController::class, 'store'])->name('.post');
    Route::put('/{client}', [ClientController::class, 'update'])->name('.update');
    Route::delete('/{client}', [ClientController::class, 'delete'])->name('.delete');
});
