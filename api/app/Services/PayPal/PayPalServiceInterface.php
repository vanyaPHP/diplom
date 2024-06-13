<?php

namespace App\Services\PayPal;

use App\Models\Bet;
use App\Models\CreditCard;
use App\Models\User;

interface PayPalServiceInterface
{
    public function makePayment(CreditCard $creditCard, User $payer, Bet $bet): bool;
}