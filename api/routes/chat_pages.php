<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('', [ChatController::class, 'list']);
Route::get('/{id}', [ChatController::class, 'single']);
Route::post('', [ChatController::class, 'store']);
Route::post('/{id}', [ChatController::class, 'newMessage']);