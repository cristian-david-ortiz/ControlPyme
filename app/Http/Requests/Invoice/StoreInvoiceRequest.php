<?php

namespace App\Http\Requests\Invoice;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sale_id' => ['required', 'exists:sales,id', 'unique:invoices,sale_id'],
            'issue_date' => ['nullable', 'date'],
            'total' => ['required', 'numeric', 'min:0'],
        ];
    }
}
