<?php

namespace App\Http\Resources;

use App\Models\BuyerStatus;
use App\Models\CreditCard;
use App\Models\SellerStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /**
         * @var User $this
         */
        return [
            'id' => $this->user_id,
            'first_name' => $this->first_name,
            'second_name' => $this->last_name,
            'is_admin' => false,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'password' => $this->password,
            'seller_rating' => new SellerStatusResource(SellerStatus::where('user_id', $this->user_id)->first()),
            'buyer_rating' => new BuyerStatusResource(BuyerStatus::where('user_id', $this->user_id)->first()),
            'credit_cards' => CreditCardResource::collection(CreditCard::where('owner_id', $this->user_id)->get())
        ];
    }
}
