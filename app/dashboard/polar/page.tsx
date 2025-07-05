'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function PolarPage() {
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [organizationToken, setOrganizationToken] = useState('');

    useEffect(() => {
        const fetchPolarAccount = async () => {
            const response = await fetch('/api/polar/accounts');
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setIsConnected(true);
                    fetchOrganizations();
                }
            }
        };

        const fetchOrganizations = async () => {
            const response = await fetch('/api/polar/organizations');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setOrganizations(data);
                }
            }
        };

        fetchPolarAccount();
    }, []);

    const handleConnect = async () => {
        const response = await fetch('/api/polar/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizationToken,
            }),
        });

        if (response.ok) {
            setIsConnected(true);
            const orgResponse = await fetch('/api/polar/organizations');
            const orgData = await orgResponse.json();
            if (Array.isArray(orgData)) {
                setOrganizations(orgData);
            }
        }
    };

    const handleDisconnect = async () => {
        await fetch('/api/polar/accounts', {
            method: 'DELETE',
        });
        setIsConnected(false);
        setOrganizations([]);
    };

    return (
        <div className="max-w-2xl ml-7">
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
                        <Button onClick={handleConnect}>Connect Polar Account</Button>
                    </div>
                </div>
            ) : (
                <div className="mt-8">
                    <Button onClick={handleDisconnect} variant="destructive">
                        Disconnect Polar Account
                    </Button>
                    <div className="flex gap-4 mt-4">
                        <Link href="/dashboard/polar/organizations" className="text-blue-500 hover:underline">Organizations</Link>
                        <Link href="/dashboard/polar/customers" className="text-blue-500 hover:underline">Customers</Link>
                        <Link href="/dashboard/polar/subscriptions" className="text-blue-500 hover:underline">Subscriptions</Link>
                        <Link href="/dashboard/polar/orders" className="text-blue-500 hover:underline">Orders</Link>
                        <Link href="/dashboard/polar/products" className="text-blue-500 hover:underline">Products</Link>
                        <Link href="/dashboard/polar/checkouts" className="text-blue-500 hover:underline">Checkouts</Link>
                        <Link href="/dashboard/polar/checkout-links" className="text-blue-500 hover:underline">Checkout Links</Link>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold">Organizations</h2>
                        <ul>
                            {organizations.length > 0 ? (
                                organizations.map((org: any) => (
                                    <li key={org.id}>{org.name}</li>
                                ))
                            ) : (
                                <li>No organizations found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

