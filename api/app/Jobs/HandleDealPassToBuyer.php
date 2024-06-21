<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\SellerStatus;
use App\Models\DealStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleDealPassToBuyer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const PRODUCT_CHECK_DELAY = 20;

    public function __construct(private Deal $deal) {}

    public function handle(): void
    {
        if ($this->deal->check_datetime_start == null)
        {
            $this->deal->deal_status_id = DealStatus::where("status_name", '=', "CLOSED_PRODUCT_NOT_PASSED")
                ->get()
                ->first()
                ->deal_status_id;
            $this->deal->save();
            
            //pay money back

            $seller = $this->deal->bet()->first()
                ->product()->first()
                ->owner()->first();
            
            $seller_rating = $seller->sellerStatus()->get()->first();
            if ($seller_rating->rating > 0)
            {
                $seller_rating->rating--;
                $seller_rating->save();
            }    

            $product = $this->deal->bet()->first()->product()->get()->first();
            $product->is_sold = false;
            $product->save();

            DealClosedWithError::dispatch($this->deal->bet()->first(), 'NOT PASSED');
            EmailProductAgainNotSoldJob::dispatch($this->deal->bet()->get()->first());

            return;
        }

        HandleProductCheck::dispatch($this->deal)->delay(self::PRODUCT_CHECK_DELAY);
    }
}
