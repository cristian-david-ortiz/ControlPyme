import React from 'react';

const ClientList = ({ clients, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        <div>
                            <strong>{client.name}</strong> - {client.email}
                            <button onClick={() => onEdit(client)}>Edit</button>
                            <button onClick={() => onDelete(client.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;