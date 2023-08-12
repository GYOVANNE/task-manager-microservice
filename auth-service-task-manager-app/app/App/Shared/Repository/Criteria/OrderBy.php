<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class OrderBy implements CriterionInterface
{
    private $columns;

    private $sort;

    public function __construct($columns, $sort = 'asc')
    {
        $this->columns = $columns;
        $this->sort = $sort;
    }

    public function apply($entity)
    {
        if (!empty($this->columns)) {
            return $entity->orderBy($this->columns, $this->sort);
        }

        return $entity;
    }
}
