<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_number',
        'card_expiration_date',
        'card_holder',
        'card_cvv',
        'owner_id'
    ];

    public $timestamps = false;

    protected $primaryKey = 'credit_card_id';

    protected $table = 'Credit_card';

    public function archivedTransactions(): HasMany
    {
        return $this->hasMany(ArchivedTransaction::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
