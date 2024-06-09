<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::prefix('api/auth')
                ->group(base_path('routes/authorization.php'));

            Route::prefix('api/main-page')
                ->group(base_path('routes/main_pages.php'));

            Route::prefix('api/user')
                ->group(base_path('routes/user_pages.php'));

            Route::prefix('api/products')
                ->group(base_path('routes/product_pages.php'));

            Route::prefix('api/bets')
                ->group(base_path('routes/bets_pages.php'));
                
            Route::prefix('api/deals')
                ->group(base_path('routes/deals_pages.php'));                
        });
    }
}
