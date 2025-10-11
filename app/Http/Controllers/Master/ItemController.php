<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\ItemRequest;
use App\Models\Master\Item;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();

            if ($user->role === 'admin') {
                $data = User::with('items')->get();
            } else {
                $data = $user->items;
            }
            return response()->json([
                'status' => 'sukses ambil data',
                'data' => $data
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'gagal ambil data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(ItemRequest $request)
    {
        try {
            $validated = $request->safe()->all();
            $validated['user_id'] = Auth::user()->id;

            $validated['purchase_date'] = $validated['purchase_date'] ?? now()->toDateString();

            $item = Item::create($validated);
            return response()->json([
                'status' => 'sukses tambah data',
                'data' => $item
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'gagal tambah data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Item $item)
    {
        try {
            $item->delete();
            return response()->json([
                'status' => 'sukses hapus data',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'gagal hapus data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

}
