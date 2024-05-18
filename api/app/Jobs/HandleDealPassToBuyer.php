<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\DealStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleDealPassToBuyer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private Deal $deal) {}

    public function handle(): void
    {
        if ($this->deal->check_datetime_start == null)
        {
            $this->deal->deal_status_id = DealStatus::where("status_name", "CLOSED_PRODUCT_NOT_PASSED")
                ->get()
                ->first()
                ->deal_status_id;
            $this->deal->save();
            
            //pay money back
            //rating decrease

            EmailProductAgainNotSoldJob::dispatch($this->deal->bet()->get()->first());

            return;
        }
    }
}
