<?php


use App\Http\Controllers\MainPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainPageController::class, 'index']);
Route::get('/email-test', [MainPageController::class, 'emailTest']);
