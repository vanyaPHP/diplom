<?php

namespace App\Services\Paginator;

use Illuminate\Http\Resources\Json\JsonResource;

interface PaginatorServiceInterface
{
    public function paginate(string $modelName, string $resourceName, array $conditions = [], array $orderBy = [], int $page = 1, int $perPage = 12): array;
}
