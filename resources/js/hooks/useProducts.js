import { useState, useEffect } from 'react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

export const useProducts = (token) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productService.getAll(token);
            setProducts(data.data);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll(token);
            setCategories(data.data);
        } catch (err) {
            setError('Failed to fetch categories');
        }
    };

    const createProduct = async (productData) => {
        try {
            const data = await productService.create(productData, token);
            setProducts([...products, data.data]);
            return data;
        } catch (err) {
            setError('Failed to create product');
            throw err;
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            const data = await productService.update(id, productData, token);
            setProducts(products.map(product => product.id === id ? data.data : product));
            return data;
        } catch (err) {
            setError('Failed to update product');
            throw err;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await productService.delete(id, token);
            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            setError('Failed to delete product');
            throw err;
        }
    };

    useEffect(() => {
        if (token) {
            fetchProducts();
            fetchCategories();
        }
    }, [token]);

    return { products, categories, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct };
};