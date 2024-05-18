<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'Transaction';

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(TransactionStatus::class);
    }

    public function sourceCard(): BelongsTo
    {
        return $this->belongsTo(CreditCard::class, 'source_card_id');
    }

    public function destinationCard(): BelongsTo
    {
        return $this->belongsTo(CreditCard::class, 'destination_card_id');
    }
}
