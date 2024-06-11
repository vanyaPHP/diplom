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
        'chat_id',
        'first_user_id',
        'second_user_id'
    ];

    public $timestamps = false;

    protected $primaryKey = 'chat_id';

    protected $table = 'Chat';

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'chat_id', 'chat_id');
    }

    public function firstUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_one_fk', 'user_id');
    }

    public function secondUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_two_fk', 'user_id');
    }
}
