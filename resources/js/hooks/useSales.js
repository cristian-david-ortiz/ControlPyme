import { useState, useEffect } from 'react';
import saleService from '../services/saleService';
import clientService from '../services/clientService';
import productService from '../services/productService';

export const useSales = (token) => {
    const [sales, setSales] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSales = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const salesResponse = await saleService.getAll(token);
            setSales(salesResponse.data);
        } catch (err) {
            setError('Failed to fetch sales');
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const clientResponse = await clientService.getAll(token);
            setClients(clientResponse.data);
        } catch (err) {
            setError('Failed to fetch clients');
        }
    };

    const fetchProducts = async () => {
        try {
            const productResponse = await productService.getAll(token);
            setProducts(productResponse.data);
        } catch (err) {
            setError('Failed to fetch products');
        }
    };

    const createSale = async (saleData) => {
        try {
            const response = await saleService.create(saleData, token);
            setSales([response.data, ...sales]);
            return response;
        } catch (err) {
            setError('Failed to create sale');
            throw err;
        }
    };

    const updateSale = async (id, saleData) => {
        try {
            const response = await saleService.update(id, saleData, token);
            setSales(sales.map((sale) => (sale.id === id ? response.data : sale)));
            return response;
        } catch (err) {
            setError('Failed to update sale');
            throw err;
        }
    };

    const deleteSale = async (id) => {
        try {
            await saleService.delete(id, token);
            setSales(sales.filter((sale) => sale.id !== id));
        } catch (err) {
            setError('Failed to delete sale');
            throw err;
        }
    };

    useEffect(() => {
        if (token) {
            fetchSales();
            fetchClients();
            fetchProducts();
        }
    }, [token]);

    return {
        sales,
        clients,
        products,
        loading,
        error,
        createSale,
        updateSale,
        deleteSale,
    };
};
