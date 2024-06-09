<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DealStatusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'deal_status_id' => $this->deal_status_id,
            'status_name' => $this->status_name,
            'status_description' => $this->status_description
        ];
    }
}
