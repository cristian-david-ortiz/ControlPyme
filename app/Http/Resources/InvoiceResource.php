<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice_number' => $this->invoice_number,
            'sale' => $this->whenLoaded('sale', fn() => [
                'id' => $this->sale->id,
                'client' => [
                    'id' => $this->sale->client->id,
                    'name' => $this->sale->client->name,
                    'email' => $this->sale->client->email,
                ],
                'total' => $this->sale->total,
            ]),
            'issue_date' => $this->issue_date,
            'total' => $this->total,
            'pdf_path' => $this->pdf_path,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
