<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerStatusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->seller_status_id,
            'rating' => $this->rating,
            'last_change_datetime' => $this->last_change_datetime,
            'last_change_diff' => $this->last_change_diff
        ];
    }
}
