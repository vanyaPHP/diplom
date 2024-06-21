<?php

namespace App\Http\Resources;

use App\Models\AddressDetail;
use App\Models\Bet;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\File;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /**
         * @var Product $this
         */
        $photoNames = File::files(storage_path('app/public') . '/' . $this->product_id);
        $photos = [];
        foreach ($photoNames as $photoName)
        {
            $parts = explode('/', $photoName);
            $name = end($parts);
            $photos []= "http://localhost:8000/storage/" . $this->product_id . "/" . $name;
        }

        $bets = Bet::where('product_id', '=', $this->product_id)->orderByDesc('made_at');
        $last_bet = null;
        foreach($bets as $bet)
        {
            if ($bet->bet_status_id == 2)
            {
                $last_bet = $bet->price;
                break;
            }
        }

        return [
            'id' => $this->product_id,
            'name' => $this->product_name,
            'description' => $this->product_description,
            'start_price' => $this->product_start_price,
            'reviews' => $this->product_reviews,
            'immediate_buy_price' => $this->immediate_buy_price,
            'is_sold' => $this->is_sold,
            'category' => new CategoryResource(Category::find($this->category_id)),
            'owner' => new UserResource(User::find($this->owner_id)),
            'photos' => $photos,
            'main_image_url' => $this->main_image_url,
            'last_bet' => $last_bet,
            'address_details' => new AddressResource(AddressDetail::find($this->address_details_id)),
        ];
    }
}
