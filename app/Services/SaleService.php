<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

class SaleService
{
    public function getAll()
    {
        return Sale::with(['client', 'user', 'items.product'])->latest('sale_date')->get();
    }

    public function findById(int $id): Sale
    {
        return Sale::with(['client', 'user', 'items.product'])->findOrFail($id);
    }

    public function create(array $data, int $userId): Sale
    {
        return DB::transaction(function () use ($data, $userId) {
            $items = $data['items'];
            $saleDate = isset($data['sale_date']) ? Carbon::parse($data['sale_date']) : Carbon::now();
            $subtotal = 0;
            $status = $data['status'] ?? 'completed';
            $decrementStock = $status === 'completed';

            $sale = Sale::create([
                'client_id' => $data['client_id'] ?? null,
                'user_id' => $userId,
                'sale_date' => $saleDate,
                'status' => $status,
                'subtotal' => 0,
                'tax' => $data['tax'] ?? 0,
                'total' => 0,
            ]);

            foreach ($items as $itemData) {
                $product = Product::findOrFail($itemData['product_id']);

                if ($decrementStock && $itemData['quantity'] > $product->stock) {
                    throw ValidationException::withMessages([
                        'items' => ["Product {$product->name} does not have enough stock."],
                    ]);
                }

                $price = $product->price;
                $subtotalItem = $price * $itemData['quantity'];

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $itemData['quantity'],
                    'price' => $price,
                    'subtotal' => $subtotalItem,
                ]);

                if ($decrementStock) {
                    $product->decrement('stock', $itemData['quantity']);
                }

                $subtotal += $subtotalItem;
            }

            $tax = $data['tax'] ?? 0;
            $total = $subtotal + $tax;

            $sale->update([
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
            ]);

            return $sale->load(['client', 'user', 'items.product']);
        });
    }

    public function update(Sale $sale, array $data): Sale
    {
        return DB::transaction(function () use ($sale, $data) {
            if (isset($data['status'])) {
                if ($data['status'] === 'cancelled' && $sale->status !== 'cancelled') {
                    $this->restoreStock($sale);
                }

                if ($data['status'] === 'completed' && $sale->status === 'cancelled') {
                    $this->decrementStock($sale);
                }
            }

            $sale->update([
                'client_id' => $data['client_id'] ?? $sale->client_id,
                'sale_date' => $data['sale_date'] ?? $sale->sale_date,
                'status' => $data['status'] ?? $sale->status,
            ]);

            return $sale->load(['client', 'user', 'items.product']);
        });
    }

    protected function decrementStock(Sale $sale): void
    {
        foreach ($sale->items as $item) {
            $product = Product::findOrFail($item->product_id);

            if ($item->quantity > $product->stock) {
                throw ValidationException::withMessages([
                    'status' => ['Unable to complete sale; insufficient stock for stock restoration.'],
                ]);
            }

            $product->decrement('stock', $item->quantity);
        }
    }

    public function delete(Sale $sale): void
    {
        DB::transaction(function () use ($sale) {
            if ($sale->status !== 'cancelled') {
                $this->restoreStock($sale);
            }

            $sale->delete();
        });
    }

    protected function restoreStock(Sale $sale): void
    {
        foreach ($sale->items as $item) {
            $product = Product::find($item->product_id);

            if ($product) {
                $product->increment('stock', $item->quantity);
            }
        }
    }
}
