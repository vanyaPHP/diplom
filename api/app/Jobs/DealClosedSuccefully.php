<?php

namespace App\Jobs;

use App\Mail\NotifyDealSuccefulMail;
use App\Models\Bet;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DealClosedSuccefully implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private Bet $bet)
    {
        
    }

    public function handle(): void
    {
        $buyer = $this->bet->buyer()->first();
        $seller = $this->bet->product()->first()->owner()->first();
        $productName = $this->bet->product()->first()->product_name;

        Mail::to($buyer->email)
            ->send(new NotifyDealSuccefulMail($buyer, $productName));

        Mail::to($seller->email)
            ->send(new NotifyDealSuccefulMail($seller, $productName));
    }
}
