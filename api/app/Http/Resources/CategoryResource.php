<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->category_id,
            'category_name' => $this->category_name,
            'parent_category_id' => $this->parent_category_id,
        ];
    }
}
