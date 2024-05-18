<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'Transaction_status';

    public function archivedTransactions(): HasMany
    {
        return $this->hasMany(ArchivedTransaction::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
