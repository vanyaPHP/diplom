<?php

namespace App\Services\CodeGenerator;

interface CodeGeneratorServiceInterface
{
    public function generate(): string;
}