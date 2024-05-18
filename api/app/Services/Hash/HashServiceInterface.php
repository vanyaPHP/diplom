<?php

namespace App\Services\Hash;

interface HashServiceInterface
{
    public function hash(string $plainText): string;
    public function verify(string $plainText, string $hash): bool;
}
