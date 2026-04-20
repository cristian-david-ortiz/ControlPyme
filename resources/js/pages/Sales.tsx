import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSales } from '../hooks/useSales';
import SaleForm from '../components/SaleForm';
import SaleList from '../components/SaleList';

const Sales = () => {
    const { token } = useAuth();
    const { sales, clients, products, loading, error, createSale, updateSale, deleteSale } = useSales(token);
    const [formError, setFormError] = useState('');

    const handleCreate = async (data) => {
        try {
            await createSale(data);
            setFormError('');
        } catch (err) {
            setFormError('Failed to create sale');
        }
    };

    const handleCancel = async (id) => {
        try {
            await updateSale(id, { status: 'cancelled' });
        } catch (err) {
            alert('Failed to cancel sale');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this sale?')) {
            try {
                await deleteSale(id);
            } catch (err) {
                alert('Failed to delete sale');
            }
        }
    };

    if (!token) return <p className="p-6">Please log in first.</p>;
    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Sales</h1>
                <p className="text-sm text-slate-600">Create and review sales records with item-level detail.</p>
            </div>

            <SaleForm clients={clients} products={products} onSubmit={handleCreate} error={formError} />
            {error && <p className="text-red-600">{error}</p>}
            <SaleList sales={sales} onCancel={handleCancel} onDelete={handleDelete} />
        </div>
    );
};

export default Sales;
