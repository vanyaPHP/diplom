<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\DealStatus;
use App\Services\CodeGenerator\CodeGeneratorService;
use App\Services\CodeGenerator\CodeGeneratorServiceInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleDealPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const PASS_TO_BUYER_DELAY = 180;

    public function __construct(private Deal $deal) {}

    public function handle(): void
    {
        $codeGenerator = new CodeGeneratorService();
        if (!$this->deal->pay_ok)
        {
            $this->deal->deal_status_id = DealStatus::where("status_name", '=', "CLOSED_PAYMENT_ERROR")
                ->get()
                ->first()
                ->deal_status_id;
            $this->deal->save();

            $bet = $this->deal->bet()->get()->first();
            $buyer = $bet->buyer()->first();
            $buyer_rating = $buyer->buyerStatus()->get()->first();
            $product = $bet->product()->get()->first();
            $product->is_sold = false;
            $product->save();

            if ($buyer_rating->rating > 0)
            {
                $buyer_rating->rating--;
                $buyer_rating->save();
            }

            EmailPaymentErrorJob::dispatch($bet);
            EmailProductAgainNotSoldJob::dispatch($bet)->delay(60);
            
            return;
        }

        $this->deal->product_received_confirm_code = $codeGenerator->generate();
        $this->deal->save();
        
        HandleDealPassToBuyer::dispatch($this->deal)->delay(self::PASS_TO_BUYER_DELAY);
    }
}
