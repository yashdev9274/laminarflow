'use client';

import { useState, useEffect } from 'react';

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const response = await fetch('/api/polar/subscriptions');
            const data = await response.json();
            setSubscriptions(data);
        };

        fetchSubscriptions();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Subscriptions</h1>
            <ul>
                {subscriptions.map((subscription: any) => (
                    <li key={subscription.id}>{subscription.id}</li>
                ))}
            </ul>
        </div>
    );
}
