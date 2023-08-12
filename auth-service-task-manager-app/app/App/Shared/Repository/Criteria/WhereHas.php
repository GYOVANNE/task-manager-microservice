<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class WhereHas implements CriterionInterface
{
    private $relation;
    private $column;
    private $operator;
    private $value;

    public function __construct($relation, $column, $operator, $value)
    {
        $this->relation = $relation;
        $this->column = $column;
        $this->operator = $operator;
        $this->value = $value;
    }

    public function apply($entity)
    {
        return $entity->whereHas($this->relation, function ($query) {
            $query->where($this->column, $this->operator, $this->value);
        });
    }
}
