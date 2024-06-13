<?php

namespace App\Providers;

use App\Services\PayPal\PayPalService;
use App\Services\PayPal\PayPalServiceInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class PayPalServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
        $this->app->singleton(PayPalServiceInterface::class, function (Application $app) {
            return new PayPalService();
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
