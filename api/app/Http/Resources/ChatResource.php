<?php

namespace App\Http\Resources;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'chat_id' => $this->chat_id,
            'first_user' => User::find($this->first_user_id),
            'second_user' => User::find($this->second_user_id),
            'messages' => MessageResource::collection(
                Message::where('chat_id', '=', $this->chat_id)->get()
            )
        ];
    }
}
