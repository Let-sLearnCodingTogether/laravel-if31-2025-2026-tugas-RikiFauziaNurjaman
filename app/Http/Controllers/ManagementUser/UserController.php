<?php

namespace App\Http\Controllers\ManagementUser;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            return response()->json([
                'user' => $user
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateAvatar(Request $request)
    {
        try {
            $request->validate([
                'avatar'  => 'required|image|mimes:png,jpg,jpeg|max:2048'
            ]);
            $user = $request->user();
            $picturePath = Storage::disk('public')->put('avatars', $request->file('avatar'));
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $user->avatar = $picturePath;
            $user->save();
            return response()->json([
                'message' => 'Avatar berhasil diperbarui',
                'avatar_url' => Storage::url($picturePath)
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui avatar',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
