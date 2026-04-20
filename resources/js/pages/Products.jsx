import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const Products = () => {
    const { token } = useAuth();
    const { products, categories, loading, error, createProduct, updateProduct, deleteProduct } = useProducts(token);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formError, setFormError] = useState('');

    const handleCreate = async (data) => {
        try {
            await createProduct(data);
            setFormError('');
        } catch (err) {
            setFormError('Failed to create product');
        }
    };

    const handleUpdate = async (data) => {
        try {
            await updateProduct(editingProduct.id, data);
            setEditingProduct(null);
            setFormError('');
        } catch (err) {
            setFormError('Failed to update product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id);
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Products</h1>
            <ProductForm
                onSubmit={editingProduct ? handleUpdate : handleCreate}
                initialData={editingProduct || {}}
                categories={categories}
                submitLabel={editingProduct ? 'Update' : 'Create'}
                error={formError}
            />
            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Products;