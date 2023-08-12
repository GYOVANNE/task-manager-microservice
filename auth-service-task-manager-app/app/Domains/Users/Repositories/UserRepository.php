<?php
namespace App\Domains\Users\Repositories;

use App\App\Shared\Repository\RepositoryAbstract;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository extends RepositoryAbstract {

    public function findByEmail($email)
    {
        return $this->entity->where('email', $email)->first();
    }

    public function create(array $properties)
    {
        $properties['password'] =  Hash::make($properties['password']);

        return $this->entity->create($properties);
    }


    protected function entity(): string
    {
        return User::class;
    }
}
