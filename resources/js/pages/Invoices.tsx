import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';

const Invoices = () => {
    const { token } = useAuth();
    const { invoices, sales, loading, error, generateFromSale, deleteInvoice } = useInvoices(token);
    const [formError, setFormError] = useState('');

    const handleGenerateFromSale = async (saleId) => {
        try {
            await generateFromSale(saleId);
            setFormError('');
        } catch (err) {
            setFormError('Failed to generate invoice from sale');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this invoice?')) {
            try {
                await deleteInvoice(id);
            } catch (err) {
                alert('Failed to delete invoice');
            }
        }
    };

    if (!token) return <p className="p-6">Please log in first.</p>;
    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Invoices</h1>
                <p className="text-sm text-slate-600">Generate and manage invoices from sales.</p>
            </div>

            <InvoiceForm sales={sales} onGenerateFromSale={handleGenerateFromSale} error={formError} />
            {error && <p className="text-red-600">{error}</p>}
            <InvoiceList invoices={invoices} onDelete={handleDelete} />
        </div>
    );
};

export default Invoices;
