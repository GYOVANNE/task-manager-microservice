<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class Where implements CriterionInterface
{
    private $column;
    private $operator;
    private $value;

    public function __construct($column, $operator, $value)
    {
        $this->column = $column;
        $this->operator = $operator;
        $this->value = $value;
    }

    public function apply($entity)
    {
        return $entity->where($this->column, $this->operator, $this->value);
    }
}
