<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Contracts;

interface CriterionInterface
{
    public function apply($entity);
}
