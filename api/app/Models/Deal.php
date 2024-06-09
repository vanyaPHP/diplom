<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'bet_id',
        'payment_datetime_start',
        'pay_ok',
        'check_datetime_start',
        'product_received_confirm_code',
        'payback_confirm_code',
        'product_returned_datetime',
        'has_erros_on_sale',
        'has_erros_on_return',
        'deal_status_id',
        'buyer_credit_card_id'
    ];

    public $timestamps = false;

    protected $primaryKey = 'deal_id';

    protected $table = 'Deal';

    public function bet(): BelongsTo
    {
        return $this->belongsTo(Bet::class, 'bet_id', 'bet_id');
    }

    public function dealStatus(): BelongsTo
    {
        return $this->belongsTo(DealStatus::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
