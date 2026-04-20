<?php

namespace App\Services;

use App\Models\Invoice;
use Carbon\Carbon;

class InvoiceService
{
    public function getAll()
    {
        return Invoice::with(['sale.client'])->latest('issue_date')->get();
    }

    public function findById(int $id): Invoice
    {
        return Invoice::with(['sale.client'])->findOrFail($id);
    }

    public function createFromSale(int $saleId): Invoice
    {
        $sale = \App\Models\Sale::findOrFail($saleId);

        $invoiceNumber = $this->generateInvoiceNumber();

        return Invoice::create([
            'sale_id' => $saleId,
            'invoice_number' => $invoiceNumber,
            'issue_date' => Carbon::now()->toDateString(),
            'total' => $sale->total,
        ]);
    }

    public function create(array $data): Invoice
    {
        $invoiceNumber = $this->generateInvoiceNumber();

        return Invoice::create([
            'sale_id' => $data['sale_id'],
            'invoice_number' => $invoiceNumber,
            'issue_date' => $data['issue_date'] ?? Carbon::now()->toDateString(),
            'total' => $data['total'],
        ]);
    }

    public function update(Invoice $invoice, array $data): Invoice
    {
        $invoice->update($data);
        return $invoice->load('sale.client');
    }

    public function delete(Invoice $invoice): void
    {
        $invoice->delete();
    }

    protected function generateInvoiceNumber(): string
    {
        $prefix = 'INV-' . date('Y');
        $lastInvoice = Invoice::where('invoice_number', 'like', $prefix . '%')
            ->latest('id')
            ->first();

        $number = $lastInvoice
            ? (int)substr($lastInvoice->invoice_number, -6) + 1
            : 1;

        return $prefix . '-' . str_pad($number, 6, '0', STR_PAD_LEFT);
    }
}
