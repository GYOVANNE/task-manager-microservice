<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class Select implements CriterionInterface
{
    /**
     * @var array
     */
    private $fields;

    public function __construct(array $fields = [])
    {
        $this->fields = $fields;
    }

    public function apply($entity)
    {
        if (!empty($this->fields)) {
            return $entity->select($this->fields);
        }

        return $entity;
    }
}
