<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRequest
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try{
            if(Auth::guard()->user()) {
                return $next($request);
            } else {
                return response()->json(['message' => 'A sessão expirou. Faça Login novamente para continuar!'], 401);
            }
        }catch (\OAuthException $e) {
            return response()->json(['message' => 'Token inválido!'], 401);
        }
    }
}
