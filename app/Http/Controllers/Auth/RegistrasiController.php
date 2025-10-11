<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegistrasiRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrasiController extends Controller
{
    public function store(RegistrasiRequest $request)
    {
        try {
            $validated = $request->safe()->all();
            $passwordHash = Hash::make($validated['password']);
            $validated['password'] = $passwordHash;
            $response = User::create($validated);

            if ($response){
                return response()->json([
                    'message' => 'Registrasi Berhasil',
                    'data' => $response
                ], 201);
            }

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Registrasi Gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
