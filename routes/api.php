<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistrasiController;
use App\Http\Controllers\Master\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('registrasi', [RegistrasiController::class, 'store']);
Route::post('login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [LoginController::class, 'logout']);

    Route::apiResource('items', ItemController::class);
});



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
