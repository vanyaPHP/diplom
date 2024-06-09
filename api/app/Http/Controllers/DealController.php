<?php

namespace App\Http\Controllers;

use App\Http\Resources\DealResource;
use App\Models\Deal;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DealController extends Controller
{
    public function listByUser()
    {
        $user_id = request()->query('user_id');
        $deals = Deal::whereHas('bet', function (Builder $query) use ($user_id) {
            $query->whereHas('product', function (Builder $query) use ($user_id) {
                $query->where('owner_id', '=', $user_id);
            })->orWhere('buyer_id', '=', $user_id);
        })->get();

        return new JsonResponse(DealResource::collection($deals), Response::HTTP_OK);   
    }

    public function singleDeal(int $deal_id)
    {
        $deal = Deal::find($deal_id);
        
        return new JsonResponse(new DealResource($deal), Response::HTTP_OK);
    }

    public function makePayment(Request $request): JsonResponse
    {
        $deal = Deal::find($request->input('deal_id'));
        $deal->buyer_credit_card_id = $request->input('credit_card_id');
        $deal->pay_ok = true;
        $deal->save();

        return new JsonResponse();
    }

    public function approveConfirmCode(Request $request): JsonResponse
    {
        $deal = Deal::find($request->input('deal_id'));
        if ($deal->product_received_confirm_code != $request->input('product_received_confirm_code'))
        {
            return new JsonResponse(['error' => 'Неверный код'], Response::HTTP_BAD_REQUEST);
        }
        
        $deal->check_datetime_start = new DateTime();
        $deal->save();

        return new JsonResponse();
    }

    public function confirmErrorsOnPass(Request $request): JsonResponse
    {
        $deal = Deal::find($request->input('deal_id'));
        $deal->has_errors_on_sale = true;
        $deal->save();

        return new JsonResponse();
    }

    public function approveReturnConfirmCode(Request $request): JsonResponse
    {
        $deal = Deal::find($request->input('deal_id'));
        if ($deal->payback_confirm_code != $request->input('payback_confirm_code'))
        {
            return new JsonResponse(['error' => 'Неверный код'], Response::HTTP_BAD_REQUEST);
        }

        $deal->product_returned_datetime = new DateTime();
        $deal->save();

        return new JsonResponse();
    }

    public function confirmErrorsOnReturn(Request $request): JsonResponse
    {
        $deal = Deal::find($request->input('deal_id'));
        $deal->has_errors_on_return = true;
        $deal->save();

        return new JsonResponse();
    }
}
