<?php

use App\Http\Controllers\BetController;
use Illuminate\Support\Facades\Route;

Route::post('/', [BetController::class, 'store']);
Route::get('/user-products-bets', [BetController::class, 'getUserProductsBets']);
Route::get('/list-product-bets/{id}', [BetController::class, 'getProductBets']);
Route::post('/manage-bet/{action}', [BetController::class, 'manageBet']);