<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DealController extends Controller
{
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
