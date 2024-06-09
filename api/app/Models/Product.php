<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_description',
        'product_name',
        'product_start_price',
        'category_id',
        'owner_id',
        'product_reviews',
        'address_details_id',
        'immediate_buy_price',
        'is_sold',
        'main_image_url'
    ];

    public $timestamps = false;

    protected $table = 'Product';

    protected $primaryKey = 'product_id';

    public function address(): BelongsTo
    {
        return $this->belongsTo(AddressDetail::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id', 'user_id');
    }

    public function bets(): HasMany
    {
        return $this->hasMany(Bet::class);
    }
}
