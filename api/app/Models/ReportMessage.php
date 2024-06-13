<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $primaryKey = 'report_message_id';

    protected $table = 'Report_message';

    public function chat(): BelongsTo
    {
        return $this->belongsTo(ReportChat::class, 'report_chat_id', 'report_chat_id');
    }
}
