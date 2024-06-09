<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\DealStatus;
use App\Models\BuyerStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleProductReturnCheck implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private Deal $deal)
    {
        
    }

    public function handle(): void
    {
        if ($this->deal->has_errors_on_return)
        {
            $buyer_rating = $this->deal->bet()->first()
                ->buyer()->first()
                ->buyerStatus()->get()->first();

            if ($buyer_rating->rating > 0)
            {
                $buyer_rating->rating--;
                $buyer_rating->save();
            }

            DealClosedWithError::dispatch($this->deal->bet()->first(), 'HAS ERRORS RETURN');

            $this->deal->deal_status_id = DealStatus::where('status_name', '=', 'CLOSED_HAS_ERRORS_RETURN')
                ->first()
                ->deal_status_id;
            $this->deal->save();    
        }

        //pay money back

        DealClosedWithError::dispatch($this->deal->bet()->first(), 'RETURNED SUCCESFULLY');
    }
}
