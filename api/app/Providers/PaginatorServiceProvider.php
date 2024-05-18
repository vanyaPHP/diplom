<?php

namespace App\Providers;

use App\Services\Paginator\PaginatorService;
use App\Services\Paginator\PaginatorServiceInterface;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class PaginatorServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(PaginatorServiceInterface::class, function (Application $app) {
            return new PaginatorService();
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
