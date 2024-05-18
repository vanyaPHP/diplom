<?php

namespace App\Jobs;

use App\Models\Bet;
use App\Models\BetStatus;
use App\Models\Deal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleDealStartJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private Bet $bet) {}

    public function handle(): void
    {
        if (BetStatus::find($this->bet->bet_status_id)->status_name == "REJECTED")
        {
            return;
        }
        
        $this->bet->bet_won = true;
        $this->bet->save();

        $deal = Deal::create([
            'bet_id' => $this->bet->bet_id,
            'payment_datetime_start' => new \DateTime()
        ]);

        $product = $this->bet->product()->get()->first(); 
        $product->is_sold = true;
        $product->save();

        HandleDealPayment::dispatch($deal); //add delay
    }
}
