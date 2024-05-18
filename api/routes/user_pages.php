<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/profile/{id}', [UserController::class, 'profile']);
Route::get('/credit-cards', [UserController::class,'creditCardsList']);
Route::post('/credit-cards', [UserController::class, 'storeCreditCard']);
Route::delete('/credit-cards/{id}', [UserController::class, 'deleteCreditCard']);
