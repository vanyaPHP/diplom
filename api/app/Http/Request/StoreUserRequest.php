<?php

namespace App\Http\Request;

use Illuminate\Http\Request;

class StoreUserRequest
{
    public function __construct(private readonly Request $request)
    {
    }

    private function rules()
    {

    }


    public function validate(): array
    {
        return $this->request->all();
    }
}
