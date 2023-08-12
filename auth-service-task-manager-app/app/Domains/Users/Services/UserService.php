<?php

namespace App\Domains\Users\Services;

use App\App\Shared\Response\ResponseError;
use App\App\Shared\Response\ResponseSuccess;
use App\Domains\Users\Repositories\UserRepository;
use App\Domains\Users\Resources\UserResource;

class UserService
{

    private $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function register($request)
    {
        $data = $request->only(['name', 'email', 'password']);

        $response = $this->repository->create($data);

        return new ResponseSuccess(new UserResource($response), 201);
    }

    public function login($request)
    {
        $credentials = $request->only(['email', 'password']);

        if (is_null($this->repository->findByEmail($credentials['email']))) {
            return new ResponseError('Unauthorized', 401);
        }

        if (!$token = auth()->attempt($credentials)) {
            return new ResponseError('Unauthorized', 401);
        }

        $response =  $this->_respondWithToken($token);

        return new ResponseSuccess($response, 200);
    }

    public function me()
    {
        return new ResponseSuccess(new UserResource(auth()->user()), 200);
    }

    public function logout()
    {
        auth()->logout();
        return new ResponseSuccess('Successfully logged out', 200);
    }

    public function refresh()
    {
        return new ResponseSuccess($this->_respondWithToken(auth()->refresh()), 200);
    }

    private function _respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => new UserResource(auth()->user())
        ];
    }
}
