<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\CityResource;
use App\Http\Resources\ProductResource;
use App\Models\AddressDetail;
use App\Models\Category;
use App\Models\City;
use App\Models\Product;
use App\Services\Paginator\PaginatorServiceInterface;
use App\Services\PhotoUploader\SimplePhotoUploader;
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

        return response()->json(['categories' => $categories, 'cities' => $cities]);
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
        $product = new ProductResource(Product::find($product_id));

        return response()->json(['product' => $product,
            'cities' => $cities, 'categories' => $categories]);
    }

    public function update(Request $request, SimplePhotoUploader $photoUploader): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product_id = $data['product_id'];

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
                'main_image_url' => $photoUploader->handlePhotosUpdating($request, $product_id) ?? ""
            ]);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function delete(int $product_id): JsonResponse
    {
        Product::where('product_id', $product_id)->delete();
        File::deleteDirectory(storage_path('app/public') . '/' . $product_id);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
