<?php

namespace App\Http\Controllers;

use App\Models\Bet;
use App\Models\CreditCard;
use App\Services\PayPal\PayPalService;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(PayPalService $payPalService)
    {
        $creditCard = CreditCard::all()->get(0);
        $payer = $creditCard->owner()->first();
        $bet = Bet::first();
        $payPalService->makePayment($creditCard, $payer, $bet);
    }
}
