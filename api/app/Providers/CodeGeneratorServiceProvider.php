<?php

namespace App\Providers;

use App\Services\CodeGenerator\CodeGeneratorServiceInterface;
use App\Services\CodeGenerator\CodeGeneratorService;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class CodeGeneratorServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(CodeGeneratorServiceInterface::class, function (Application $app) {
            return new CodeGeneratorService();
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
