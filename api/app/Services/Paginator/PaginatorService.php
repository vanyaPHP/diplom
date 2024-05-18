<?php

namespace App\Services\Paginator;

class PaginatorService implements PaginatorServiceInterface
{

    public function paginate(string $modelName, string $resourceName, array $conditions = [], array $orderBy = [], int $page = 1, int $perPage = 15): array
    {
        $query = null;
        if ($conditions != [])
        {
            $fields = array_keys($conditions);
            $values = array_values($conditions);
            $count = count($fields);
            if (is_array($values[0][0]))
            {
                $query = $modelName::where($fields[0], $values[0][0][0], $values[0][0][1]);
                if (isset($values[0][1][0]))
                {
                    $query = $query->andWhere($fields[0], $values[0][1][0], $values [0][1][1]);
                }
            }
            else
            {
                $query = $modelName::where($fields[0], $values[0][0], $values[0][1]);
            }

            for($i = 1;$i < $count;$i++)
            {
                if (is_array($values[$i][0]))
                {
                    $query = $query->where($fields[$i], $values[$i][0][0], $values[$i][0][1]);
                    if (isset($values[$i][1][0]))
                    {
                        $query = $query->where($fields[$i], $values[$i][1][0], $values[$i][1][1]);
                    }
                }
                else
                {
                    $query = $query->where($fields[$i], $values[$i][0], $values[$i][1]);
                }
            }
        }

        if ($query == null)
        {
            if ($modelName::all()->count() % $perPage == 0)
            {
                $pagesCount = $modelName::all()->count() / $perPage;
            }
            else
            {
                $pagesCount = (int)($modelName::all()->count() / $perPage) + 1;
            }

            $records = $modelName::skip(($page - 1) * $perPage)
                ->take($perPage)
                ->get();
        }
        else
        {
            if ($query->get()->count() % $perPage == 0)
            {
                $pagesCount = $query->get()->count() / $perPage;
            }
            else
            {
                $pagesCount = (int)($query->get()->count() / $perPage) + 1;
            }

            $records = $query->limit($perPage)->offset(($page - 1) * $perPage)->get();
        }

        if ($orderBy != [])
        {
            foreach ($orderBy as $field => $direction)
            {
                if ($direction == "asc")
                {
                    $records = $records->sortBy($field);
                }
                else 
                {
                    $records = $records->sortByDesc($field);
                }
            }
        }

        return [
          'data' => $resourceName::collection($records),
          'pages_count' => $pagesCount
        ];
    }
}
