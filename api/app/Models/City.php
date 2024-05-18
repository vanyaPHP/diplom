<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        '*'
    ];

    public $timestamps = false;

    protected $table = 'City';

    protected $primaryKey = 'city_id';

    public function addresses(): HasMany
    {
        return $this->hasMany(AddressDetail::class);
    }
}
