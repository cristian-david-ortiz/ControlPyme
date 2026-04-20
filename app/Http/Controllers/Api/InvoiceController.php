<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invoice\StoreInvoiceRequest;
use App\Http\Requests\Invoice\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Services\InvoiceService;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function __construct(private InvoiceService $invoiceService) {}

    public function index()
    {
        $invoices = $this->invoiceService->getAll();

        return response()->json([
            'success' => true,
            'data' => InvoiceResource::collection($invoices),
        ]);
    }

    public function show(int $id)
    {
        $invoice = $this->invoiceService->findById($id);

        return response()->json([
            'success' => true,
            'data' => new InvoiceResource($invoice),
        ]);
    }

    public function store(StoreInvoiceRequest $request)
    {
        $invoice = $this->invoiceService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Invoice created successfully.',
            'data' => new InvoiceResource($invoice->load('sale.client')),
        ], 201);
    }

    public function generateFromSale(int $saleId)
    {
        $invoice = $this->invoiceService->createFromSale($saleId);

        return response()->json([
            'success' => true,
            'message' => 'Invoice generated successfully.',
            'data' => new InvoiceResource($invoice->load('sale.client')),
        ], 201);
    }

    public function update(UpdateInvoiceRequest $request, int $id)
    {
        $invoice = Invoice::findOrFail($id);
        $updatedInvoice = $this->invoiceService->update($invoice, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Invoice updated successfully.',
            'data' => new InvoiceResource($updatedInvoice),
        ]);
    }

    public function destroy(int $id)
    {
        $invoice = Invoice::findOrFail($id);
        $this->invoiceService->delete($invoice);

        return response()->json([
            'success' => true,
            'message' => 'Invoice deleted successfully.',
        ]);
    }
}
