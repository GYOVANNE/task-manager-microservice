<?php

declare(strict_types=1);

namespace App\App\Shared\Repository;

use App\App\Shared\Repository\Contracts\RepositoryInterface;
use App\App\Shared\Repository\Exceptions\ModelNotFoundException;
use App\App\Shared\Repository\Exceptions\NoEntityDefinedException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

abstract class RepositoryAbstract implements RepositoryInterface
{
    protected $entity;

    public function __construct()
    {
        $this->entity = $this->resolveEntity();
    }

    protected function resolveEntity()
    {
        if (!method_exists($this, 'entity')) {
            throw new NoEntityDefinedException();
        }

        return app()->make($this->entity());
    }

    abstract protected function entity();

    public function all()
    {
        return $this->entity->get();
    }

    public function count()
    {
        return $this->entity->count();
    }

    public function first()
    {
        return $this->entity->first();
    }

    public function find($id)
    {
        $model = $this->getModel($id);

        if (!$model) {
            throw (new ModelNotFoundException())->setModel(
                get_class($this->entity->getModel()),
                $id
            );
        }

        return $model;
    }

    protected function getModel($item)
    {
        return ($item instanceof Model) ? $item : $this->entity->find($item);
    }

    public function findWhere($column, $value)
    {
        return $this->entity->where($column, $value)->get();
    }

    public function paginate($perPage = 50)
    {
        return $this->entity->paginate($perPage);
    }

    public function create(array $properties)
    {
        return $this->entity->create($properties);
    }

    public function update($id, array $properties)
    {
        $this->getModel($id)->update($properties);
        return $this->getModel($id);
    }

    public function delete($id)
    {
        return $this->getModel($id)->delete();
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

    public function withFilters(array $filters = [])
    {
        $objects = [];

        foreach ($filters as $filter => $value) {
            $class = 'App\\App\\Shared\\Repository\\Criteria\\' . ucfirst(Str::camel($filter));
            if (class_exists($class)) {
                $objects[] = new $class($value ?? null);
            }
        }

        return $this->withCriteria($objects);
    }

    public function withCriteria(...$criteria)
    {
        $criteria = Arr::flatten($criteria);

        foreach ($criteria as $criterion) {
            $this->entity = $criterion->apply($this->entity);
        }

        return $this;
    }
}
