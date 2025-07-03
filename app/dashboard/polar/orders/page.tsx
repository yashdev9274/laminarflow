'use client';

import { useState, useEffect } from 'react';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/polar/orders');
            const data = await response.json();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <ul>
                {orders.map((order: any) => (
                    <li key={order.id}>{order.id}</li>
                ))}
            </ul>
        </div>
    );
}
