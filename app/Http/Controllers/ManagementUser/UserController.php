<?php

namespace App\Http\Controllers\ManagementUser;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        try {
            $user = User::select('id', 'name', 'email', 'role', 'avatar')->orderBy('id', 'desc')->get();
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

    public function switchRole(Request $request)
    {
        try {
            if($request->user()->role !== 'admin')
            {
                return response()->json([
                    'message' => 'Anda tidak memiliki akses untuk ubah role'
                ], 403);
            }

            $request->validate([
                'role' => 'required|in:admin,user',
                'user_id' => 'required|exists:users,id',
            ]);
            $user = User::findOrFail($request->input('user_id'));
            $user->role = $request->input('role');
            $user->save();

            return response()->json([
                'message' => 'Role berhasil diperbarui',
                'role' => $user->role
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui role',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'current_password' => 'required',
                'password' => 'required|min:8|confirmed',
            ]);

            $user = Auth::user();

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password lama tidak sesuai'
                ], 400);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Password berhasil diperbarui'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui password',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json([
                    'message' => 'Akses ditolak. Hanya admin yang dapat menghapus user.'
                ], 403);
            }

            $user = User::findOrFail($id);

            if ($user->id === $request->user()->id) {
                return response()->json([
                    'message' => 'Admin tidak dapat menghapus akun sendiri.'
                ], 400);
            }

            $user->delete();

            return response()->json([
                'message' => 'User berhasil dihapus'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
