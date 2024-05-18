<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DealStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'Deal_status';

    public function closedDeals(): HasMany
    {
        return $this->hasMany(ClosedDeal::class);
    }

    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class);
    }
}
