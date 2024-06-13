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
        'report_chat_id',
        'admin_id',
        'user_id'
    ];

    public $timestamps = false;

    protected $primaryKey = 'report_chat_id';

    protected $table = 'Report_chat';

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'report_chat_id', 'report_chat_id');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'admin_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
