<?php

namespace App\Services\Hash;

use Illuminate\Support\Facades\Hash;

class BcryptHashService implements HashServiceInterface
{
    public function hash(string $plainText): string
    {
        return password_hash($plainText, PASSWORD_BCRYPT);
    }

    public function verify(string $plainText, string $hash): bool
    {
        return password_verify($plainText, $hash);
    }
}
