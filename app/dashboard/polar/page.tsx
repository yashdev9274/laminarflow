'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function PolarPage() {
    const [organizations, setOrganizations] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [organizationToken, setOrganizationToken] = useState('');
    const [developerApiToken, setDeveloperApiToken] = useState('');

    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await fetch('/api/polar/organizations');
            if (response.ok) {
                const data = await response.json();
                setOrganizations(data);
                setIsConnected(true);
            }
        };

        fetchOrganizations();
    }, []);

    const handleConnect = async () => {
        const response = await fetch('/api/polar/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizationToken,
                developerApiToken,
            }),
        });

        if (response.ok) {
            setIsConnected(true);
            const orgResponse = await fetch('/api/polar/organizations');
            const orgData = await orgResponse.json();
            setOrganizations(orgData);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Polar Integration</h1>
            <p className="text-gray-500">
                Connect your Polar account to manage your organizations, customers, and subscriptions.
            </p>
            {!isConnected ? (
                <div className="mt-4">
                    <div className="flex flex-col gap-4">
                        <Input
                            placeholder="Organization Access Token"
                            value={organizationToken}
                            onChange={(e) => setOrganizationToken(e.target.value)}
                        />
                        <Input
                            placeholder="Developer API Token"
                            value={developerApiToken}
                            onChange={(e) => setDeveloperApiToken(e.target.value)}
                        />
                        <Button onClick={handleConnect}>Connect Polar Account</Button>
                    </div>
                </div>
            ) : (
                <div className="mt-8">
                    <div className="flex gap-4">
                        <Link href="/dashboard/polar/organizations">Organizations</Link>
                        <Link href="/dashboard/polar/customers">Customers</Link>
                        <Link href="/dashboard/polar/subscriptions">Subscriptions</Link>
                        <Link href="/dashboard/polar/orders">Orders</Link>
                        <Link href="/dashboard/polar/products">Products</Link>
                        <Link href="/dashboard/polar/checkouts">Checkouts</Link>
                        <Link href="/dashboard/polar/checkout-links">Checkout Links</Link>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold">Organizations</h2>
                        <ul>
                            {organizations.map((org: any) => (
                                <li key={org.id}>{org.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
