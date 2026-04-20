<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sale\StoreSaleRequest;
use App\Http\Requests\Sale\UpdateSaleRequest;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use App\Services\SaleService;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function __construct(private SaleService $saleService) {}

    public function index()
    {
        $sales = $this->saleService->getAll();

        return response()->json([
            'success' => true,
            'data' => SaleResource::collection($sales),
        ]);
    }

    public function show(int $id)
    {
        $sale = $this->saleService->findById($id);

        return response()->json([
            'success' => true,
            'data' => new SaleResource($sale),
        ]);
    }

    public function store(StoreSaleRequest $request)
    {
        $sale = $this->saleService->create($request->validated(), $request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'Sale created successfully.',
            'data' => new SaleResource($sale),
        ], 201);
    }

    public function update(UpdateSaleRequest $request, int $id)
    {
        $sale = Sale::findOrFail($id);
        $updatedSale = $this->saleService->update($sale, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Sale updated successfully.',
            'data' => new SaleResource($updatedSale),
        ]);
    }

    public function destroy(int $id)
    {
        $sale = Sale::findOrFail($id);
        $this->saleService->delete($sale);

        return response()->json([
            'success' => true,
            'message' => 'Sale deleted successfully.',
        ]);
    }
}
