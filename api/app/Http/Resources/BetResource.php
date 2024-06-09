<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BetResource extends JsonResource
{
    
    public function toArray(Request $request): array
    {
        $status_cast = [
            "MADE" => "сделана",
            "ACCEPTED" => "принята",
            "REJECTED" => "отклонена"
        ];

        return [
            "made_datetime" => (new \DateTime($this->made_datetime))->format("Y-m-d H:i"),
            "accepted_datetime" => ($this->accepted_datetime == null) 
                ? 'ставка ещё не принята'
                 : (new \DateTime($this->accepted_datetime))->format("Y-m-d H:i"),
            "status" => $status_cast[$this->status()->get()->first()->status_name],
            "bet_won" => ($this->bet_won == null)
                ? 'товар ещё на торгах'
                : (($this->bet_won) ? 'да' : 'нет'),
            "bet_id" => $this->bet_id,
            'product' => new ProductResource(Product::find($this->product_id)),
            "user" => new UserResource($this->buyer()->get()->first()),
            "price" => $this->price,
        ];
    }
}
