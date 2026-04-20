import { useState, useEffect } from 'react';
import clientService from '../services/clientService';

export const useClients = (token) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await clientService.getAll(token);
            setClients(data.data);
        } catch (err) {
            setError('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    const createClient = async (clientData) => {
        try {
            const data = await clientService.create(clientData, token);
            setClients([...clients, data.data]);
            return data;
        } catch (err) {
            setError('Failed to create client');
            throw err;
        }
    };

    const updateClient = async (id, clientData) => {
        try {
            const data = await clientService.update(id, clientData, token);
            setClients(clients.map(client => client.id === id ? data.data : client));
            return data;
        } catch (err) {
            setError('Failed to update client');
            throw err;
        }
    };

    const deleteClient = async (id) => {
        try {
            await clientService.delete(id, token);
            setClients(clients.filter(client => client.id !== id));
        } catch (err) {
            setError('Failed to delete client');
            throw err;
        }
    };

    useEffect(() => {
        if (token) fetchClients();
    }, [token]);

    return { clients, loading, error, fetchClients, createClient, updateClient, deleteClient };
};