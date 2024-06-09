<?php

namespace App\Http\Resources;

use App\Models\Bet;
use App\Models\CreditCard;
use App\Models\DealStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DealResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'deal_id' => $this->deal_id,
            'bet' => new BetResource(Bet::find($this->bet_id)),
            'payment_datetime_start' => $this->payment_datetime_start,
            'pay_ok' => $this->pay_ok,
            'check_datetime_start' => $this->check_datetime_start,
            'product_received_confirm_code' => $this->product_received_confirm_code,
            'payback_confirm_code' => $this->payback_confirm_code,
            'product_returned_datetime' => $this->product_returned_datetime,
            'has_erros_on_sale' => $this->has_erros_on_sale,
            'has_errors_on_return' => $this->has_errors_on_return,
            'deal_status' => new DealStatusResource(DealStatus::find($this->deal_status_id)),
            'credit_card' => new CreditCardResource(CreditCard::find($this->buyer_credit_card_id))  
        ];
    }
}
