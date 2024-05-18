<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/product-form-info', [ProductController::class, 'getProductFormInfo']);
Route::post('/new-product-photos', [ProductController::class, 'saveProductPhotos']);
Route::post('/save-product', [ProductController::class, 'store']);
Route::get('/', [ProductController::class, 'getUserProducts']);
Route::get('/all', [ProductController::class, 'getAllProducts']);
Route::get('/{product_id}', [ProductController::class, 'getProduct']);
Route::put('/update-product', [ProductController::class, 'update']);
Route::delete('/delete-product/{product_id}', [ProductController::class, 'delete']);
