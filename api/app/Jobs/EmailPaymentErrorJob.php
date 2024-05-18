<?php

namespace App\Jobs;

use App\Mail\PaymentErrorMail;
use App\Models\Bet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EmailPaymentErrorJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private Bet $bet) {}

    public function handle(): void
    {
        $buyer = $this->bet->buyer()->get()->first();
        Mail::to($buyer->email)->send(new PaymentErrorMail($buyer, $this->bet->product()->get()->first()));
    }
}
