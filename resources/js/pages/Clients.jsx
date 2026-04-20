import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useClients } from '../hooks/useClients';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';

const Clients = () => {
    const { token } = useAuth();
    const { clients, loading, error, createClient, updateClient, deleteClient } = useClients(token);
    const [editingClient, setEditingClient] = useState(null);
    const [formError, setFormError] = useState('');

    const handleCreate = async (data) => {
        try {
            await createClient(data);
            setFormError('');
        } catch (err) {
            setFormError('Failed to create client');
        }
    };

    const handleUpdate = async (data) => {
        try {
            await updateClient(editingClient.id, data);
            setEditingClient(null);
            setFormError('');
        } catch (err) {
            setFormError('Failed to update client');
        }
    };

    const handleEdit = (client) => {
        setEditingClient(client);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteClient(id);
            } catch (err) {
                alert('Failed to delete client');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Clients</h1>
            <ClientForm
                onSubmit={editingClient ? handleUpdate : handleCreate}
                initialData={editingClient || {}}
                submitLabel={editingClient ? 'Update' : 'Create'}
                error={formError}
            />
            <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Clients;