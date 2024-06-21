<?php

namespace App\Jobs;

use App\Mail\ProductAgainNotSoldMail;
use App\Models\Bet;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EmailProductAgainNotSoldJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private Bet $errorBet) {}

    public function handle(): void
    {
        $bets = Bet::where("product_id", $this->errorBet->product()->get()->first()->product_id)->get();
        
        foreach ($bets as $bet)
        {
            if ($bet->bet_id != $this->errorBet->bet_id)
            {
                Mail::to($bet->buyer()->get()->first()->email)->send(new ProductAgainNotSoldMail($bet));
            }

            //$bet->delete();
        }
    }
}
