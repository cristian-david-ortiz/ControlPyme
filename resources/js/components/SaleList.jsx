import React from 'react';

const SaleList = ({ sales, onCancel, onDelete }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sales</h2>
            <div className="space-y-4">
                {sales.map((sale) => (
                    <div key={sale.id} className="rounded-lg border p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Sale #{sale.id}</h3>
                                <p className="text-sm text-slate-600">Client: {sale.client?.name || 'No client'}</p>
                                <p className="text-sm text-slate-600">Date: {new Date(sale.sale_date).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                {sale.status === 'completed' && (
                                    <button type="button" onClick={() => onCancel(sale.id)} className="rounded-md bg-amber-600 px-3 py-2 text-sm text-white">
                                        Cancel
                                    </button>
                                )}
                                <button type="button" onClick={() => onDelete(sale.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm text-white">
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-4">
                            <div>
                                <span className="text-sm text-slate-500">Status</span>
                                <p className="text-sm font-medium">{sale.status}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">Subtotal</span>
                                <p className="text-sm font-medium">${sale.subtotal}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">Tax</span>
                                <p className="text-sm font-medium">${sale.tax}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">Total</span>
                                <p className="text-sm font-medium">${sale.total}</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {sale.items.map((item) => (
                                <div key={item.id} className="rounded-md border bg-slate-50 p-3">
                                    <p className="text-sm font-semibold">{item.product?.name}</p>
                                    <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-slate-600">Price: ${item.price}</p>
                                    <p className="text-sm text-slate-600">Subtotal: ${item.subtotal}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaleList;
