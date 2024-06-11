<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function list()
    {
        $user_id = request()->query('user_id');
        $chats = Chat::where('first_user_id', '=', $user_id)
            ->orWhere('second_user_id', '=', $user_id)
            ->get();
        
        return new JsonResponse(ChatResource::collection($chats), 200);    
    }

    public function single(int $id)
    {
        return new JsonResponse(new ChatResource(Chat::find($id)), 200);
    }

    public function store()
    {
        $data = request()->all();
        $chat = Chat::create($data);

        return new JsonResponse(new ChatResource($chat), 201);
    }

    public function newMessage()
    {
        $message = Message::create(request()->all());
        return new JsonResponse(new MessageResource($message), 201);
    }
}
