<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditCardResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->credit_card_id,
            'card_number' => $this->card_number,
            'card_expiration_date' => $this->card_expiration_date,
            'card_holder' => $this->card_holder,
            'card_cvv' => $this->card_cvv
        ];
    }
}
