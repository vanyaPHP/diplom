<?php

namespace App\Jobs;

use App\Mail\RejectedBetMail;
use App\Models\Bet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EmailRejectedBetsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private array $betsIds;

    public function __construct(array $betsIds)
    {
        $this->betsIds = $betsIds;
    }

    
    public function handle(): void
    {
        foreach ($this->betsIds as $betsId) 
        {
            $bet = Bet::find($betsId);
            Mail::to($bet->buyer()->get()->first()->email)->send(new RejectedBetMail($bet));
        }
    }
}
