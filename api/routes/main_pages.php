<?php


use App\Http\Controllers\MainPageController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainPageController::class, 'index']);
Route::get('/test', [TestController::class, 'test']);
