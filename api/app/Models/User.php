<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password'
    ];

    protected $primaryKey = 'user_id';

    public $timestamps = false;

    protected $table = 'User';

    public function bets(): HasMany
    {
        return $this->hasMany(Bet::class);
    }

    public function buyerStatus(): HasOne
    {
        return $this->hasOne(BuyerStatus::class, 'user_id', 'user_id');
    }

    public function sellerStatus(): HasOne
    {
        return $this->hasOne(SellerStatus::class);
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }

    public function closedDeals(): HasMany
    {
        return $this->hasMany(ClosedDeal::class);
    }

    public function creditCards(): HasMany
    {
        return $this->hasMany(CreditCard::class);
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function reportChats(): HasMany
    {
        return $this->hasMany(ReportChat::class);
    }
}
