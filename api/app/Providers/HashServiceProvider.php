<?php

namespace App\Providers;

use App\Services\Hash\BcryptHashService;
use App\Services\Hash\HashServiceInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class HashServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(HashServiceInterface::class, function (Application $app) {
            return new BcryptHashService();
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
