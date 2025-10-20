<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\ItemRequest;
use App\Http\Requests\Master\UpdateRequest;
use App\Models\Master\Item;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();

            if ($user->role === 'admin') {
                $data = Item::with('user:id,name,email')->get();
            } else {
                $data = $user->items()->get();
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

    public function show(Item $item)
    {
        try {
            $user = Auth::user();

            if ($user->role !== 'admin' && $user->id !== $item->user_id) {
                return response()->json([
                    'status'    => 'gagal ambil data',
                    'message'   => 'anda tidak bisa melihat data ini'
                ], 403);
            }

            $item->load(['user']);
            return response()->json([
                'status' => 'sukses ambil data',
                'data' => $item
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'gagal tambah data',
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


    public function update(UpdateRequest $request, Item $item)
    {
        try {
            $validated = $request->safe()->all();
            $validated['purchase_date'] = $validated['purchase_date'] ?? $item->purchase_date->toDateString();
            $validated['user_id'] = Auth::user()->id;

            $item->update($validated);

            return response()->json([
                'status' => 'sukses update data',
                'data' => $item
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'gagal update data',
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
