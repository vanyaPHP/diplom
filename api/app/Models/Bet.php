<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Bet extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'buyer_id',
        'price',
        'made_datetime',
        'bet_status_id',
        'accepted_datetime',
        'bet_won'
    ];

    public $timestamps = false;

    protected $primaryKey = 'bet_id';

    protected $table = 'Bet';

    public function status(): BelongsTo
    {
        return $this->belongsTo(BetStatus::class, 'bet_status_id', 'bet_status_id');
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id', 'user_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function deal(): HasOne
    {
        return $this->hasOne(Deal::class, 'bet_id', 'bet_id');
    }
}
