'use client';

import { useState, useEffect } from 'react';

interface Customer {
    id: string;
    name: string;
    email: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/polar/customers');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data.items || []);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            {customers.length > 0 ? (
                <ul className="space-y-2">
                    {customers.map((customer) => (
                        <li key={customer.id} className="p-2 border rounded">
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
}
