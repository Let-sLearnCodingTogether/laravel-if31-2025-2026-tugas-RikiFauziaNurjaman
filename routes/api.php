<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistrasiController;
use App\Http\Controllers\ManagementUser\UserController;
use App\Http\Controllers\Master\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('registrasi', [RegistrasiController::class, 'store']);
Route::post('login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [LoginController::class, 'logout']);

    Route::apiResource('items', ItemController::class);

    Route::get('/user', [UserController::class, 'index']);
    Route::put('/user/updateAvatar', [UserController::class, 'updateAvatar']);
    Route::put('/user/switchRole', [UserController::class, 'switchRole']);
    Route::put('/user/updatePassword', [UserController::class, 'updatePassword']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
});



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
