<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AddressDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_id',
        'street',
        'building'
    ];

    public $timestamps = false;

    protected $table = 'Address_details';

    protected $primaryKey = 'address_details_id';

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

    public function product(): HasOne
    {
        return $this->hasOne(Product::class);
    }
}
