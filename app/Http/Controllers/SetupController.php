<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetupRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class SetupController extends Controller
{
    public function show(): Response
    {
        // If users already exist, redirect to login
        if (User::exists()) {
            return redirect()->route('login');
        }

        return Inertia::render('setup');
    }

    public function store(SetupRequest $request): RedirectResponse
    {
        // Double-check that no users exist
        if (User::exists()) {
            return redirect()->route('login');
        }

        // Create the first admin user
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Automatically log in the new user
        auth()->attempt([
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return redirect()->route('dashboard');
    }
}
