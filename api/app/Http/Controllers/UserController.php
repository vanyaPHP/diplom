<?php

namespace App\Http\Controllers;

use App\Http\Request\StoreUserRequest;
use App\Http\Resources\AdminResource;
use App\Http\Resources\CreditCardResource;
use App\Http\Resources\UserResource;
use App\Models\Admin;
use App\Models\BuyerStatus;
use App\Models\CreditCard;
use App\Models\SellerStatus;
use App\Models\User;
use App\Services\Hash\HashServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function login(Request $request, HashServiceInterface $hashService)
    {
        $user = User::where('email', '=', $request->input('email'))->first();
        if ($user == null)
        {
            $admin = Admin::where('email', '=', $request->input('email'))->first();
            if ($admin == null)
            {
                return response('Wrong credentials', 400);
            }
        }

        if ($user != null)
        {
            if ($hashService->verify($request->input('password'), $user->password))
            {
                return response(new UserResource($user), 200)
                    ->cookie('user_id', $user->user_id, 1440);
            }
        }
        if ($admin != null)
        {
            if ($hashService->verify($request->input('password'), $admin->password))
            {
                return response(new AdminResource($admin), 200)
                    ->cookie('user_id', $admin->admin_id, 1440);
            }
        }

        return response('Wrong credentials', Response::HTTP_BAD_REQUEST);
    }

    public function register(StoreUserRequest $request, HashServiceInterface $hashService): JsonResponse
    {
        $userData = $request->validate();
        $userData['password'] = $hashService->hash($userData['password']);
        $user = User::create($userData);

        $dateTime = new \DateTime();
        SellerStatus::create([
            'user_id' => $user->user_id,
            'rating' => 50,
            'last_change_datetime' => $dateTime,
            'last_change_diff' => 0
        ]);
        BuyerStatus::create([
            'user_id' => $user->user_id,
            'rating' => 50,
            'last_change_datetime' => $dateTime,
            'last_change_diff' => 0
        ]);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function profile(int $id): JsonResponse
    {
        return (new UserResource(User::find($id)))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    public function creditCardsList(Request $request): JsonResponse
    {
        return response()
        ->json([
            'credit_cards' => CreditCardResource::collection(
                CreditCard::where(['owner_id' => $request->query('user_id')])->get()
            )
        ])
        ->setStatusCode(Response::HTTP_OK);
    }

    public function storeCreditCard(Request $request): JsonResponse
    {
        $creditCard = CreditCard::create($request->all());

        return (new CreditCardResource($creditCard))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);

    }

    public function deleteCreditCard(int $id): JsonResponse
    {
        CreditCard::where('credit_card_id', $id)->delete();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
