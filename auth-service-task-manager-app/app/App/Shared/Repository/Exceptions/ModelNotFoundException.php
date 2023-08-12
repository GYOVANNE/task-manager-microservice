<?php

declare(strict_types=1);

namespace App\App\Shared\Repository\Exceptions;

use Exception;
use Illuminate\Support\Arr;

final class ModelNotFoundException extends Exception
{
    /**
     * Name of the affected Eloquent model.
     *
     * @var string
     */
    protected $model;

    /**
     * The affected model IDs.
     *
     * @var int|array
     */
    protected $ids;

    /**
     * Get the affected Eloquent model.
     *
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set the affected Eloquent model and instance ids.
     *
     * @param string $model
     * @param int|array $ids
     * @return $this
     */
    public function setModel($model, $ids = [])
    {
        $this->model = $model;
        $this->ids = Arr::wrap($ids);

        $this->message = "No query results.";

//        if (count($this->ids) > 0) {
//            $this->message .= ' '.implode(', ', $this->ids);
//        } else {
//            $this->message .= '.';
//        }

        return $this;
    }

    /**
     * Get the affected Eloquent model IDs.
     *
     * @return int|array
     */
    public function getIds()
    {
        return $this->ids;
    }
}
