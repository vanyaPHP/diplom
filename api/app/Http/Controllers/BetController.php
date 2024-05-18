<?php

namespace App\Http\Controllers;

use App\Http\Resources\BetResource;
use App\Http\Resources\ProductResource;
use App\Jobs\EmailRejectedBetsJob;
use App\Jobs\HandleDealStartJob;
use App\Models\Bet;
use App\Models\BetStatus;
use App\Models\Product;
use App\Services\Paginator\PaginatorServiceInterface;
use DateTime;
use Illuminate\Http\Request;

class BetController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $data["made_datetime"] = new \DateTime();
        $data["bet_status_id"] = BetStatus::where('status_name', "MADE")->get()->first()->bet_status_id;
        $data["accepted_datetime"] = null;
        $data["bet_won"] = null;

        $bet = Bet::create($data);

        return response()->json($bet)->setStatusCode(201);
    }

    public function getUserProductsBets(Request $request, PaginatorServiceInterface $paginator)
    {
        $conditions['buyer_id'] = [
            '=',
            $request->query('user_id')
        ];

        $product_id = $request->query('product_id');
        if ($product_id)
        {
            $conditions['product_id'] = [
                '=',
                $product_id
            ];
        }

        $paginationResult = $this->getPaginatedBets($conditions, $paginator);
        $bets = $paginationResult['data'];
        $betsData = [];
        foreach($bets as $bet)
        {
            $product_id = $bet->product()->get()->first()->product_id; 
            $betsData[$product_id]['bets'] []= new BetResource($bet);
            $betsData[$product_id]['product'] = new ProductResource($bet->product()->get()->first());
        }

        $availableProducts = [];
        foreach($betsData as $productId => $info)
        {
            $availableProducts []= [
                'product_id' => $productId,
                'product_name' => Product::find($productId)->product_name,
            ];
        }

        $data = [
            'pagesCount' => $paginationResult['pages_count'],
            'betsData' => $betsData,
            'availableProducts' => $availableProducts
        ];

        return response()->json($data);
    }

    public function getProductBets(int $id, Request $request, PaginatorServiceInterface $paginator)
    {
        $rating = $request->query('rating');
        $conditions['product_id'] = [
            '=',
            $id
        ];
       
        $paginationResult = $this->getPaginatedBets($conditions, $paginator); 
        $bets = $paginationResult['data'];
        
        if ($rating && $rating != "no")
        {
            $ratings = $bets->map(function ($bet) {
                return Bet::where('bet_id', $bet->bet_id)->get()->first()
                        ->buyer()->get()->first()->
                        buyerStatus()->get()->first()->rating;
            });
            if ($rating == "asc")
            {
                $bets = $bets->sortBy(function($bet, $key) use ($ratings) {
                    return $ratings[$key];
                });
            }
            else
            {
                $bets = $bets->sortByDesc(function($bet, $key) use ($ratings) {
                    return $ratings[$key];
                });
            }
        }

        $betsData = [];
        foreach($bets as $bet)
        {
            $betsData['bets'] []= new BetResource($bet);
            $betsData['product'] = new ProductResource($bet->product()->get()->first());
        }

        $data = [
            'pagesCount' => $paginationResult['pages_count'],
            'betsData' => $betsData 
        ];

        return response()->json($data);
    }

    public function manageBet(string $action)
    {
        $rejectedStatusId = BetStatus::where('status_name' , 'REJECTED')->get()->first()->bet_status_id;
        if ($action == "accept")
        {
            $bet = Bet::find(request()->all('bet_id'));
            $otherBetsOnProduct = Bet::where('product_id', $bet->product_id)->get();
            $betsIdsToEmail = [];
            $otherBetsOnProduct->each(function($otherBet) use ($rejectedStatusId, $betsIdsToEmail) {
                $otherBet->bet_status_id = $rejectedStatusId;
                $otherBet->save();
                $betsIdsToEmail []= $otherBet->bet_id;
            });
            $bet->bet_status_id = BetStatus::where('status_name', "ACCEPTED")->get()->first()->bet_status_id;
            $bet->accepted_datetime = new DateTime();
            $bet->save();
            HandleDealStartJob::dispatch($bet);
            EmailRejectedBetsJob::dispatch($betsIdsToEmail);
        }
        else if ($action == "reject")
        {
            $bet = Bet::find(request()->all('bet_id'));
            $bet->bet_status_id = $rejectedStatusId;
            $bet->save();
            EmailRejectedBetsJob::dispatch([$bet->bet_id]);
        }

        return response()->setStatusCode(200);
    }

    private function getPaginatedBets(array $conditions, PaginatorServiceInterface $paginator)
    {
        $orderBy = [];
        $page = request()->query('page') ?? 1;
        $fromDate = request()->query('fromDate');
        $toDate = request()->query('toDate');
        $price = request()->query('price');
        $status = request()->query('status');

        if ($fromDate) 
        {
            $conditions['made_datetime'] = [
                [
                    '>=',
                    $fromDate
                ]   
                ];
        }
        if ($toDate)
        {
            $conditions['made_datetime'] []= [
                '<=',
                $toDate
            ];
        }
        if ($status && $status != "ALL")
        {
            $conditions["bet_status_id"] = [
                '=',
                BetStatus::where("status_name", $status)->get()->first()->bet_status_id
            ];
        }

        if ($price && $price != "no")
        {
            $orderBy['price'] = $price;
        }

        return $paginator->paginate(Bet::class, BetResource::class, $conditions, $orderBy, $page);
    }
}
