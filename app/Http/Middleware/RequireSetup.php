<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireSetup
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If no users exist and we're not on the setup page, redirect to setup
        if (! User::exists() && ! $request->routeIs('setup.*')) {
            return redirect()->route('setup.show');
        }

        // If users exist and we're on the setup page, redirect to login
        if (User::exists() && $request->routeIs('setup.*')) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}
