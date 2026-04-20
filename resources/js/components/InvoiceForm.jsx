import React, { useState } from 'react';

const InvoiceForm = ({ sales, onGenerateFromSale, error }) => {
    const [selectedSaleId, setSelectedSaleId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSaleId) {
            onGenerateFromSale(Number(selectedSaleId));
            setSelectedSaleId('');
        }
    };

    const getSalesWithoutInvoices = () => {
        return sales.filter((sale) => !sale.invoice);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-6">
            <div>
                <label className="mb-2 block text-sm font-medium">Select sale to generate invoice</label>
                <select
                    value={selectedSaleId}
                    onChange={(e) => setSelectedSaleId(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    required
                >
                    <option value="">Choose a sale</option>
                    {getSalesWithoutInvoices().map((sale) => (
                        <option key={sale.id} value={sale.id}>
                            Sale #{sale.id} - {sale.client?.name || 'No client'} - ${sale.total}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="rounded-md bg-slate-900 px-6 py-2 text-white" disabled={!selectedSaleId}>
                Generate Invoice
            </button>
        </form>
    );
};

export default InvoiceForm;
