<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\SellerStatus;
use App\Models\BuyerStatus;
use App\Models\DealStatus;
use App\Services\CodeGenerator\CodeGeneratorService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Psr\Log\LoggerInterface;

class HandleProductCheck implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const PRODUCT_RETURN_DELAY = 20;

    public function __construct(private Deal $deal)
    {
        
    }

    public function handle(LoggerInterface $logger): void
    {
        $codeGeneratorService = new CodeGeneratorService();
        $seller = $this->deal->bet()->first()
            ->product()->first()
            ->owner()->first();
        $buyer = $this->deal->bet()->first()
            ->buyer()->first();

        $seller_rating = $seller->sellerStatus()->get()->first();
        $buyer_rating = $buyer->buyerStatus()->get()->first();
        
        if ($this->deal->has_errors_on_sale)
        {
            if ($seller_rating->rating > 0)
            {
                $seller_rating->rating--;
                $seller_rating->save();
            }

            $this->deal->deal_status_id = DealStatus::where('status_name', '=', 'CLOSED_PRODUCT_HAS_ERRORS')
                ->first()
                ->deal_status_id;
            $this->deal->save();

            $this->deal->payback_confirm_code = $codeGeneratorService->generate();
            $this->deal->save();
            
            DealClosedWithError::dispatch($this->deal->bet()->first(), 'HAS ERRORS');
            HandleProductReturn::dispatch($this->deal)->delay(self::PRODUCT_RETURN_DELAY);
            
            return;
        }

        if ($buyer_rating->rating < 100)
        {
            $buyer_rating->rating++;
            $buyer_rating->save();
        }
        if ($seller_rating->rating < 100)
        {
            $seller_rating->rating++;
            $seller_rating->save();
        }

        $this->deal->deal_status_id = DealStatus::where('status_name', '=', 'CLOSED_SUCCESFULLY')
            ->first()
            ->deal_status_id;
        $this->deal->save();
        DealClosedSuccefully::dispatch($this->deal->bet()->first());    
    }
}
