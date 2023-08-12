<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class GroupBy implements CriterionInterface
{
    private $columns;

    public function __construct($columns)
    {
        $this->columns = $columns;
    }

    public function apply($entity)
    {
        if (!empty($this->columns)) {
            return $entity->groupBy($this->columns);
        }

        return $entity;
    }
}
