<?php

namespace App\Http\Resources;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->address_details_id,
            'city' => new CityResource(City::find($this->city_id)),
            'street' => $this->street,
            'building' => $this->building,
        ];
    }
}
