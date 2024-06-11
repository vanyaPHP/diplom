<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'message_id' => $this->message_id,
            'message_text' => $this->message_text,
            'sender' => User::find($this->sender_id),
            'chat_id' => $this->chat_id,
            'message_datetime' => $this->message_datetime
        ];
    }
}
