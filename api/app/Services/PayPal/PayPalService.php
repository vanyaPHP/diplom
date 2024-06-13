<?php

namespace App\Services\PayPal;

use App\Models\Bet;
use App\Models\CreditCard;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class PayPalService implements PayPalServiceInterface
{
    private string $username;
    private string $password;
    private string $signature;

    public function __construct()
    {
        $this->username = env('PAYPAL_USERNAME');
        $this->password = env('PAYPAL_PASSWORD');
        $this->signature = env('PAYPAL_SIGNATURE');
    }

    public function makePayment(CreditCard $creditCard, User $payer, Bet $bet): bool
    {
        $address = $bet->product()->first()->address()->first();
        $city = $address->city()->first();
        $params = [
            'METHOD' => 'DoDirectPayment',
            'VERSION' => '124.0',
            'USER' => $this->username,
            'PWD' => $this->password,
            'SIGNATURE' => $this->signature,
            'PAYMENTACTION' => 'Sale',
            'IPADDRESS' => $_SERVER['REMOTE_ADDR'],
            'AMT' => $bet->price / 3.26,
            'CREDITCARDTYPE' => 'visa',
            'ACCT' => $creditCard->card_number,
            'EXPDATE' => $creditCard->card_expiration_date[0]
                .$creditCard->card_expiration_date[1]
                ."20".$creditCard->card_expiration_date[2]
                .$creditCard->card_expiration_date[3],
            'CVV2' => $creditCard->card_cvv,
            'FIRSTNAME' => $payer->first_name,
            'LASTNAME' => $payer->first_name,
            'STREET' => $address->street_name,
            'CITY' => $city->city_name,
            'STATE' => 'SOME STATE',
            'COUNTRYCODE' => 'BY',
            'ZIP' => '220000',
            'CURRENCYCODE' => 'USD',
        ];

        $response = Http::post(env('PAYPAL_URL'), [
            'form_params' => $params
        ]);

        if ($response->status() == 200)
        {
            return true;
        }

        return false;
    }
}