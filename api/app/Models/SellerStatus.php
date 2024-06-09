<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SellerStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating',
        'user_id',
        'last_change_datetime',
        'last_change_diff'
    ];

    public $timestamps = false;

    protected $primaryKey = 'seller_status_id';

    protected $table = 'Seller_status';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
