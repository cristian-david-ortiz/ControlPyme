import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {}, categories = [], submitLabel = 'Submit', error }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category</label>
                <select
                    name="category_id"
                    value={formData.category_id || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">{submitLabel}</button>
        </form>
    );
};

export default ProductForm;