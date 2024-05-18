<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\DealStatus;
use App\Services\CodeGenerator\CodeGeneratorServiceInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleDealPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly Deal $deal) {}

    /**
     * Execute the job.
     */
    public function handle(CodeGeneratorServiceInterface $codeGenerator): void
    {
        if (!$this->deal->pay_ok)
        {
            $this->deal->deal_status_id = DealStatus::where("status_name", "CLOSED_PAYMENT_ERROR")
                ->get()
                ->first()
                ->deal_status_id;
            $this->deal->save();

            $bet = $this->deal->bet()->get()->first();
            $product = $bet->product()->get()->first();
            $product->is_sold = false;
            $product->save();

            //rating decrease
            EmailPaymentErrorJob::dispatch($bet);
            EmailProductAgainNotSoldJob::dispatch($bet)->delay(1);
            
            return;
        }

        $this->deal->product_received_confirm_code = $codeGenerator->generate();
        $this->deal->save();
        
        HandleDealPassToBuyer::dispatch($this->deal); //add delay
    }
}
