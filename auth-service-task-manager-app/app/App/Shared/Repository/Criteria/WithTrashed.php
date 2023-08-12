<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Criteria;

use App\App\Shared\Repository\Contracts\CriterionInterface;

final class WithTrashed implements CriterionInterface
{
    public function apply($entity)
    {
        return $entity->withTrashed();
    }
}
