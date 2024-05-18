<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Mail\RejectedBetMail;
use App\Models\Bet;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Mail;

class MainPageController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::all());
    }
}
