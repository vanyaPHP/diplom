<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BuyerStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating',
        'user_id',
        'last_change_datetime',
        'last_change_diff'
    ];

    public $timestamps = false;

    protected $table = 'Buyer_status';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
