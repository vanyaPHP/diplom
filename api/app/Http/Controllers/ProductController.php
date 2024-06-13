<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\CityResource;
use App\Http\Resources\CreditCardResource;
use App\Http\Resources\ProductResource;
use App\Models\AddressDetail;
use App\Models\Bet;
use App\Models\Category;
use App\Models\City;
use App\Models\CreditCard;
use App\Models\Deal;
use App\Models\Product;
use App\Services\Paginator\PaginatorServiceInterface;
use App\Services\PhotoUploader\SimplePhotoUploader;
use DealStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function getProductFormInfo(): JsonResponse
    {
        $categories = CategoryResource::collection(Category::all());
        $cities = CityResource::collection(City::all());
        $creditCards = CreditCardResource::collection(
            CreditCard::where(
                'owner_id', 
                '=',
                request()->query('user_id'))->get()
        );

        return response()->json(['categories' => $categories, 'cities' => $cities, 'credit_cards' => $creditCards]);
    }

    public function saveProductPhotos(Request $request, SimplePhotoUploader $photoUploader): JsonResponse
    {
        $paths = $photoUploader->storePhotosPublicly($request);

        return response()->json(['filenames' => $paths]);
    }

    public function store(Request $request, SimplePhotoUploader $photoUploader): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $address = AddressDetail::create([
            'city_id' => $data['cityId'],
            'street' => $data['street'],
            'building' => $data['building']
        ]);

        $product = Product::create([
            'product_name' => $data['product_name'],
            'product_description' => $data['product_description'],
            'product_reviews' => 0,
            'is_sold' => false,
            'product_start_price' => $data['product_start_price'],
            'owner_id' => $data['owner_id'],
            'category_id' => $data['category_id'],
            'immediate_buy_price' => $data['immediate_buy_price'],
            'seller_credit_card_id' => $data['seller_credit_card_id'],
            'address_details_id' => $address->address_details_id,
            'main_image_url' => ""
        ]);

        $product->main_image_url = $photoUploader->handlePhotosNewProduct($request, $product->product_id) ?? "";
        $product->save();

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(201);
    }

    public function getAllProducts(Request $request, PaginatorServiceInterface $paginatorService): JsonResponse
    {
        $category_id = $request->query->get('category_id');
        $page = $request->query->get('page') ?? 1;
        $conditions = [];
        $conditions['is_sold'] = [
            '=',
            false
        ];

        if ($category_id != null)
        {
            $conditions['category_id'] = [
                '=',
                $category_id
            ];
        }

        $paginationResult = $paginatorService->paginate(Product::class, ProductResource::class, $conditions, [], $page);
        
        return new JsonResponse([
            'data' => $paginationResult['data'],
            'pages_count' => $paginationResult['pages_count']
        ], Response::HTTP_OK);
    }

    public function getUserProducts(Request $request, PaginatorServiceInterface $paginatorService): JsonResponse
    {
        $conditions['owner_id'] = [
            '=',
            $request->query->get('user_id')
        ];
        $page = $request->query->get('page') ?? 1;

        $paginationResult = $paginatorService->paginate(Product::class, ProductResource::class, $conditions, [], $page);

        return new JsonResponse([
            'data' => $paginationResult['data'],
            'pages_count' => $paginationResult['pages_count']
        ], Response::HTTP_OK);
    }

    public function getProduct(int $product_id): JsonResponse
    {
        $categories = CategoryResource::collection(Category::all());
        $cities = CityResource::collection(City::all());
        $product = Product::find($product_id);
        $product->product_reviews++;
        $product->save();
        $product = new ProductResource($product);

        return response()->json(['product' => $product,
            'cities' => $cities, 'categories' => $categories]);
    }

    public function update(Request $request, SimplePhotoUploader $photoUploader): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product_id = $data['product_id'];
        $mainImageUrl = $photoUploader->handlePhotosUpdating($request, $product_id) ?? "";

        if (!$this->checkIfProductIsAccessible(
            Product::where('product_id', '=', $product_id)
                ->get()->first()
        ))
        {
            return new JsonResponse(
                ['error' => 'Сделка по товару еще не закончена или по товару есть активные ставки'],
                Response::HTTP_BAD_REQUEST
            );
        }

        AddressDetail::where('address_details_id', $data['address_details_id'])
            ->update([
                'city_id' => $data['cityId'],
                'street' => $data['street'],
                'building' => $data['building']
            ]);

        Product::where('product_id', $product_id)
            ->update([
                'product_name' => $data['product_name'],
                'product_description' => $data['product_description'],
                'immediate_buy_price' => $data['immediate_buy_price'],
                'main_image_url' => $mainImageUrl
            ]);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function delete(int $product_id): JsonResponse
    {
        $product = Product::where('product_id', $product_id)->get()->first();
        if (!$this->checkIfProductIsAccessible($product))
        {
            return new JsonResponse(
                ['error' => 'Сделка по товару еще не закончена или по товару есть активные ставки'],
                Response::HTTP_BAD_REQUEST
            );
        }
        
        $product->delete();
        File::deleteDirectory(storage_path('app/public') . '/' . $product_id);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    private function checkIfProductIsAccessible(Product $product): bool
    {
        $deals = Deal::whereHas('bet', function(Builder $query) use ($product) {
            $query->where('product_id', '=', $product->product_id);
        })->get();

        if ($deals->count() == 0)
        {
            $bets = Bet::where('product_id', '=', $product->product_id)->get();
            if ($bets->count() == 0)
            {
                return true;
            }

            return false;
        }

        $lastDeal = $deals[0];
        if ($lastDeal->deal_status_id == DealStatusEnum::CLOSED_PRODUCT_HAS_ERRORS->value 
            || $lastDeal->deal_status_id == DealStatusEnum::STARTED->value
        )
        {
            return false;
        }

        return true;
    }
}
