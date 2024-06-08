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

class HandleProductReturn implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const PRODUCT_RETURN_CHECK_DELAY = 180;

    public function __construct(private Deal $deal)
    {
        
    }

    public function handle(): void
    {
        if ($this->deal->product_returned_datetime == null)
        {
            /**
             * @var BuyerStatus $buyer_rating
             */
            $buyer_rating = $this->deal->bet()->first()
                ->buyer()->first()
                ->buyerStatus()->first();

            if ($buyer_rating->rating > 0)
            {
                $buyer_rating->rating--;
                $buyer_rating->save();
            }

            $this->deal->deal_status_id = DealStatus::where('status_name', '=', 'CLOSED_PRODUCT_NO_RETURN')
                ->first()
                ->deal_status_id;
            $this->deal->save();

            DealClosedWithError::dispatch($this->deal->bet()->first(), 'NO RETURN');
            
            return;
        }

        HandleProductReturnCheck::dispatch($this->deal)->delay(self::PRODUCT_RETURN_CHECK_DELAY);
    }
}
