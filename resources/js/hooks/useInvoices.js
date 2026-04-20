import { useState, useEffect } from 'react';
import invoiceService from '../services/invoiceService';
import saleService from '../services/saleService';

export const useInvoices = (token) => {
    const [invoices, setInvoices] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInvoices = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await invoiceService.getAll(token);
            setInvoices(response.data);
        } catch (err) {
            setError('Failed to fetch invoices');
        } finally {
            setLoading(false);
        }
    };

    const fetchSales = async () => {
        try {
            const response = await saleService.getAll(token);
            setSales(response.data);
        } catch (err) {
            setError('Failed to fetch sales');
        }
    };

    const generateFromSale = async (saleId) => {
        try {
            const response = await invoiceService.generateFromSale(saleId, token);
            setInvoices([response.data, ...invoices]);
            return response;
        } catch (err) {
            setError('Failed to generate invoice');
            throw err;
        }
    };

    const create = async (data) => {
        try {
            const response = await invoiceService.create(data, token);
            setInvoices([response.data, ...invoices]);
            return response;
        } catch (err) {
            setError('Failed to create invoice');
            throw err;
        }
    };

    const update = async (id, data) => {
        try {
            const response = await invoiceService.update(id, data, token);
            setInvoices(invoices.map((invoice) => (invoice.id === id ? response.data : invoice)));
            return response;
        } catch (err) {
            setError('Failed to update invoice');
            throw err;
        }
    };

    const deleteInvoice = async (id) => {
        try {
            await invoiceService.delete(id, token);
            setInvoices(invoices.filter((invoice) => invoice.id !== id));
        } catch (err) {
            setError('Failed to delete invoice');
            throw err;
        }
    };

    useEffect(() => {
        if (token) {
            fetchInvoices();
            fetchSales();
        }
    }, [token]);

    return {
        invoices,
        sales,
        loading,
        error,
        generateFromSale,
        create,
        update,
        deleteInvoice,
    };
};
