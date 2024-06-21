<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->admin_id,
            'first_name' => $this->first_name,
            'second_name' => $this->last_name,
            'is_admin' => true,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}
