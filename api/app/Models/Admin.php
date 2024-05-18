<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password'
    ];

    public $timestamps = false;

    protected $table = 'Admin';

    public function chats(): HasMany
    {
        return $this->hasMany(ReportChat::class);
    }
}
