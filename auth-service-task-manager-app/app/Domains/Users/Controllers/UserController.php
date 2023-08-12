<?php


namespace App\Domains\Users\Controllers;

use App\Domains\Users\Requests\LoginRequest;
use App\Domains\Users\Requests\UserCreateRequest;
use App\Domains\Users\Services\UserService;
use App\Http\Controllers\Controller;

class UserController  extends Controller
{

    private $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function register(UserCreateRequest $request)
    {
        return $this->service->register($request)->response();
    }

    public function login(LoginRequest $request)
    {
        return $this->service->login($request)->response();
    }

    public function me()
    {
        return $this->service->me()->response();
    }

    public function logout()
    {
        return $this->service->logout()->response();
    }

    public function refresh()
    {
        return $this->service->refresh()->response();
    }
}
