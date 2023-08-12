<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class WhereNotNull implements CriterionInterface
{
    private $column;

    public function __construct($column)
    {
        $this->column = $column;
    }

    public function apply($entity)
    {
        return $entity->whereNotNull($this->column);
    }
}
