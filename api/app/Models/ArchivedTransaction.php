<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ArchivedTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'archived_transactions';

    public function closedDeal(): BelongsTo
    {
        return $this->belongsTo(ClosedDeal::class);
    }

    public function sourceCard(): BelongsTo
    {
        return $this->belongsTo(CreditCard::class, 'source_card_fk');
    }

    public function destinationCard(): BelongsTo
    {
        return $this->belongsTo(CreditCard::class, 'destination_card_fk');
    }

    public function transactionStatus(): BelongsTo
    {
        return $this->belongsTo(TransactionStatus::class);
    }
}
