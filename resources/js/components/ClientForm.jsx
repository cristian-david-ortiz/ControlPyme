import React, { useState } from 'react';

const ClientForm = ({ onSubmit, initialData = {}, submitLabel = 'Submit', error }) => {
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
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address</label>
                <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">{submitLabel}</button>
        </form>
    );
};

export default ClientForm;