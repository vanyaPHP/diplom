<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BetStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $primaryKey = 'bet_status_id';

    protected $table = 'Bet_status';

    public function bets(): HasMany
    {
        return $this->hasMany(Bet::class);
    }
}
