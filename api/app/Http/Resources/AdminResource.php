<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'admin_id' => $this->admin_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'password' => $this->password
        ];
    }
}
