<?php

use App\Http\Controllers\DealController;
use Illuminate\Support\Facades\Route;

Route::get('/list-user-deals', [DealController::class, 'listByUser']);
Route::get('/show-deal/{deal_id}', [DealController::class, 'singleDeal']);
Route::post('/pay', [DealController::class, 'makePayment']);
Route::post('/approve-confirm-code', [DealController::class, 'approveConfirmCode']);
Route::post('/confirm-errors-on-pass', [DealController::class, 'confirmErrorsOnPass']);
Route::post('/approve-return-confirm-code', [DealController::class, 'approveReturnConfirmCode']);
Route::post('/confirm-errors-on-return', [DealController::class, 'confirmErrorsOnReturn']);