import React from 'react';

const InvoiceList = ({ invoices, onDelete }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Invoices</h2>
            <div className="space-y-4">
                {invoices.map((invoice) => (
                    <div key={invoice.id} className="rounded-lg border p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-base font-semibold">{invoice.invoice_number}</h3>
                                <p className="text-sm text-slate-600">Client: {invoice.sale?.client?.name || 'N/A'}</p>
                                <p className="text-sm text-slate-600">Issue date: {invoice.issue_date}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => onDelete(invoice.id)}
                                className="rounded-md bg-red-600 px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <div>
                                <span className="text-sm text-slate-500">Sale ID</span>
                                <p className="text-sm font-medium">#{invoice.sale?.id}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">Total</span>
                                <p className="text-sm font-medium">${invoice.total}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {invoices.length === 0 && <p className="text-sm text-slate-500">No invoices yet.</p>}
            </div>
        </div>
    );
};

export default InvoiceList;
