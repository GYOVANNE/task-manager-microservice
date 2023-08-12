<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class EagerLoad implements CriterionInterface
{
    private $relations;

    public function __construct(array $relations = [])
    {
        $this->relations = $relations;
    }

    public function apply($entity)
    {
        if (!empty($this->relations)) {
            return $entity->with($this->relations);
        }

        return $entity;
    }
}
