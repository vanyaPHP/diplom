<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReportChat extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'Report_chat';

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
