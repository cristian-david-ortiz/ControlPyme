import React, { useState, useMemo } from 'react';

const SaleForm = ({ clients, products, onSubmit, error }) => {
    const [formData, setFormData] = useState({
        client_id: '',
        sale_date: new Date().toISOString().slice(0, 16),
        status: 'completed',
        tax: 0,
        items: [{ product_id: '', quantity: 1 }],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, field, value) => {
        const items = [...formData.items];
        items[index][field] = field === 'quantity' ? Number(value) : value;
        setFormData({ ...formData, items });
    };

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { product_id: '', quantity: 1 }] });
    };

    const removeItem = (index) => {
        const items = formData.items.filter((_, itemIndex) => itemIndex !== index);
        setFormData({ ...formData, items });
    };

    const selectedProducts = useMemo(() => {
        return products.reduce((map, product) => {
            map[product.id] = product;
            return map;
        }, {});
    }, [products]);

    const itemsSubtotal = useMemo(() => {
        return formData.items.reduce((sum, item) => {
            const product = selectedProducts[item.product_id];
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
    }, [formData.items, selectedProducts]);

    const total = itemsSubtotal + Number(formData.tax || 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            ...formData,
            sale_date: new Date(formData.sale_date).toISOString(),
            tax: Number(formData.tax || 0),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">Client</label>
                    <select name="client_id" value={formData.client_id} onChange={handleChange} className="w-full rounded-md border px-3 py-2">
                        <option value="">Select client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Sale date</label>
                    <input
                        type="datetime-local"
                        name="sale_date"
                        value={formData.sale_date}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border px-3 py-2">
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Tax</label>
                    <input
                        type="number"
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2"
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Items</h2>
                    <button type="button" onClick={addItem} className="rounded-md bg-slate-800 px-4 py-2 text-white">
                        Add item
                    </button>
                </div>

                {formData.items.map((item, index) => (
                    <div key={index} className="mb-4 rounded-lg border p-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Product</label>
                                <select
                                    name="product_id"
                                    value={item.product_id}
                                    onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                >
                                    <option value="">Select product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Quantity</label>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    min="1"
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex items-end justify-end">
                                <button type="button" onClick={() => removeItem(index)} className="rounded-md bg-red-600 px-4 py-2 text-white">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                            Price: ${selectedProducts[item.product_id]?.price || 0} • Subtotal: ${((selectedProducts[item.product_id]?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="rounded-lg border bg-slate-50 p-4">
                <div className="flex justify-between text-sm text-slate-600">
                    <span>Items subtotal</span>
                    <span>${itemsSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                    <span>Tax</span>
                    <span>${Number(formData.tax || 0).toFixed(2)}</span>
                </div>
                <div className="mt-3 flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" className="rounded-md bg-slate-900 px-6 py-3 text-white">
                Create sale
            </button>
        </form>
    );
};

export default SaleForm;
