<?php

namespace App\Jobs;

use App\Models\Bet;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotifyDealFailureMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DealClosedWithError implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const MESSAGE_MAP = [
        'NOT PASSED' => 'Товар не передан покупателю',
        'HAS ERRORS' => 'Товар не соответствует описаниию при продаже',
        'NO RETURN'  => 'Товар не передан обратно продавцу',
        'HAS ERRORS RETURN' => 'Товар не соответствует изначальному состоянию при продаже'
    ];

    public function __construct(private readonly Bet $bet, private readonly string $errorMsg)
    {
        
    }

    public function handle(): void
    {
        $buyer = $this->bet->buyer()->first();
        $seller = $this->bet->product()->first()->owner()->first();
        $productName = $this->bet->product()->first()->product_name;
        $errorMsg = self::MESSAGE_MAP[$this->errorMsg];

        Mail::to($buyer->email)
            ->send(new NotifyDealFailureMail($buyer, $productName, $errorMsg));

        Mail::to($seller->email)
            ->send(new NotifyDealFailureMail($seller, $productName, $errorMsg));
    }
}
