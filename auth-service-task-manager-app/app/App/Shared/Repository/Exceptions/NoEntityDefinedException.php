<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Exceptions;

use Exception;

class NoEntityDefinedException extends Exception
{
    protected $message = "No entity was defined.";
}
