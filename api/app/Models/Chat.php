<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'Chat';

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function firstUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_one_fk');
    }

    public function secondUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_two_fk');
    }
}
