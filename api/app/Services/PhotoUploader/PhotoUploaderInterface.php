<?php

namespace App\Services\PhotoUploader;

use Illuminate\Http\Request;

interface PhotoUploaderInterface
{
    public function storePhotosPublicly(Request $request): array;

    public function handlePhotosNewProduct(Request $request, int $product_id): ?string;

    public function handlePhotosUpdating(Request $request, int $product_id): ?string;
}
