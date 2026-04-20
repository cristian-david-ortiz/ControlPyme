import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <div>
                            <strong>{product.name}</strong> - ${product.price} (Stock: {product.stock})
                            <br />
                            Category: {product.category?.name}
                            <br />
                            <button onClick={() => onEdit(product)}>Edit</button>
                            <button onClick={() => onDelete(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;