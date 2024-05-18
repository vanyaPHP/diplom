<?php

namespace App\Services\PhotoUploader;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SimplePhotoUploader implements PhotoUploaderInterface
{

    public function storePhotosPublicly(Request $request): array
    {
        $productId = $request->query('product_id');
        $storePath = '/public/temp';
        $publicPath = "http://localhost:8000/storage/temp/";
        $storeName = '';
        if ($productId != null)
        {
            $storePath = '/public/' . $productId;
            $publicPath = "http://localhost:8000/storage/$productId/";
            $storeName = 'new_';
        }

        $uploadedFiles = $request->file();
        $paths = [];
        foreach ($uploadedFiles as $file) {
            $storeName .= $file->getClientOriginalName();
            $parts = explode('/', $file->storePubliclyAs($storePath, $storeName));
            $name = end($parts);
            $paths []= $publicPath . $name;
        }

        return $paths;
    }

    public function handlePhotosNewProduct(Request $request, int $product_id): ?string
    {
        $data = json_decode($request->getContent(), true);

        $photoLinks = $data['photos'];
        $photos = [];
        foreach ($photoLinks as $photoLink)
        {
            $parts = explode('/', $photoLink);
            $photos []= end($parts);
        }

        $fileObjects = File::files(storage_path('app/public') . '/temp');
        $fileNames = [];
        foreach ($fileObjects as $file)
        {
            $fileNames []= $file->getFilename();
        }
        $diff = array_diff($fileNames, $photos);

        if (count($diff) != 0)
        {
            foreach ($diff as $fileName)
            {
                unlink(storage_path('app/public') . '/temp/' . $fileName);
            }
        }

        File::makeDirectory(storage_path('app/public') . '/' . $product_id);
        foreach ($photos as $photo)
        {
            File::copy(storage_path('app/public') . '/temp/' . $photo,
                storage_path('app/public') . '/' . $product_id . '/' . $photo);

            unlink(storage_path('app/public') . '/temp/' . $photo);
        }

        if (count($photos) > 0)
        {
            return "http://localhost:8000/storage/" . $product_id . "/" . $photos[0];
        }

        return null;
    }

    public function handlePhotosUpdating(Request $request, int $product_id): ?string
    {
        $data = json_decode($request->getContent(), true);
        $uploadedPhotos = $data['photos'];

        $existingPhotos = File::files(storage_path('app/public') . '/' . $product_id);
        $existingPhotosNames = [];
        foreach ($existingPhotos as $existingPhoto)
        {
            $parts = explode('/', $existingPhoto);
            $name = end($parts);
            if (!str_contains($name, 'new_'))
            {
                $existingPhotosNames []= "http://localhost:8000/storage/" . $product_id . '/' . $name;
            }
        }

        foreach ($existingPhotosNames as $existingPhotosName)
        {
            if (!in_array($existingPhotosName, $uploadedPhotos))
            {
                $parts = explode('/', $existingPhotosName);
                $name = end($parts);
                unlink(storage_path('app/public') . '/' . $product_id . '/' . $name);
            }
        }

        $existingPhotos = File::files(storage_path('app/public') . '/' . $product_id);
        foreach ($existingPhotos as $existingPhoto)
        {
            $parts = explode('/', $existingPhoto);
            $name = end($parts);
            $existingPhotosNames []= "http://localhost:8000/storage/" . $product_id . '/' . $name;
        }

        $diff = array_diff($existingPhotosNames, $uploadedPhotos);

        if (count($diff) > 0)
        {
            foreach ($diff as $photoToDelete)
            {
                $parts = explode('/', $photoToDelete);
                $name = end($parts);
                if (file_exists(storage_path('app/public') . '/' . $product_id . '/' . $name))
                {
                    unlink(storage_path('app/public') . '/' . $product_id . '/' . $name);
                }
            }
        }

        $existingPhotos = File::files(storage_path('app/public') . '/' . $product_id);
        $mainPhotoUrl = null;
        foreach ($existingPhotos as $key => $existingPhoto)
        {
            $parts = explode('/', $existingPhoto);
            $name = end($parts);
            if (str_contains($name, 'new_'))
            {
                $name = substr($name, 4);
                rename(storage_path('app/public') . '/' . $product_id . '/new_' . $name,
                    storage_path('app/public') . '/' . $product_id . '/' . $name);
            }
        }

        if (count($uploadedPhotos) > 0)
        {
            $mainPhotoUrl = $uploadedPhotos[0];
        }

        return $mainPhotoUrl;
    }
}
