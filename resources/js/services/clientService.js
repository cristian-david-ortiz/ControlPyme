import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

const clientService = {
    getAll: async (token) => {
        const response = await axios.get(`${API_BASE_URL}/clients`, getAuthHeaders(token));
        return response.data;
    },

    getById: async (id, token) => {
        const response = await axios.get(`${API_BASE_URL}/clients/${id}`, getAuthHeaders(token));
        return response.data;
    },

    create: async (data, token) => {
        const response = await axios.post(`${API_BASE_URL}/clients`, data, getAuthHeaders(token));
        return response.data;
    },

    update: async (id, data, token) => {
        const response = await axios.put(`${API_BASE_URL}/clients/${id}`, data, getAuthHeaders(token));
        return response.data;
    },

    delete: async (id, token) => {
        const response = await axios.delete(`${API_BASE_URL}/clients/${id}`, getAuthHeaders(token));
        return response.data;
    },
};

export default clientService;