'use client';

import { useState, useEffect } from 'react';

export default function CheckoutsPage() {
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        const fetchCheckouts = async () => {
            const response = await fetch('/api/polar/checkouts');
            const data = await response.json();
            setCheckouts(data);
        };

        fetchCheckouts();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Checkouts</h1>
            <ul>
                {checkouts.map((checkout: any) => (
                    <li key={checkout.id}>{checkout.id}</li>
                ))}
            </ul>
        </div>
    );
}
