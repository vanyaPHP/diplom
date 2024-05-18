<?php

namespace App\Providers;

use App\Services\PhotoUploader\PhotoUploaderInterface;
use App\Services\PhotoUploader\SimplePhotoUploader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;

class PhotoUploaderProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(PhotoUploaderInterface::class, function (Application $app) {
            return new SimplePhotoUploader();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
