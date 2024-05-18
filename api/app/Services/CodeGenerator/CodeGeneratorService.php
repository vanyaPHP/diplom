<?php

namespace App\Services\CodeGenerator;

use Illuminate\Support\Str;

class CodeGeneratorService implements CodeGeneratorServiceInterface
{
    public function generate(): string
    {
        return Str::random(8);
    }
}