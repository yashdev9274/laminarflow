'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AnalyticsIcon } from '@/components/icons/analyticsIcon';
import { DollarSignIcon } from '@/components/icons/dollarsignIcon';
import { FileStackIcon } from '@/components/icons/fileStackIcon';
import { WalletIcon } from '@/components/icons/walletIcon';

export default function OrganizationsPage() {
    const [organizations, setOrganizations] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await fetch('/api/polar/organizations');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setOrganizations(data);
                }
            }
        };

        fetchOrganizations();
    }, []);

    return (
        <div className='ml-11'>
            <h1 className="text-2xl font-bold">Organizations</h1>
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {organizations.length > 0 ? (
                    organizations.map((org: any) => (
                        <Card key={org.id}>
                            <CardHeader>
                                <CardTitle>{org.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">{org.bio}</p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <DollarSignIcon className="w-5 h-5 mr-2" />
                                            <span>Revenue</span>
                                        </div>
                                        <span>${(org.revenue / 100).toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <AnalyticsIcon className="w-5 h-5 mr-2" />
                                            <span>Active Subscriptions</span>
                                        </div>
                                        <span>{org.activeSubscriptions}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FileStackIcon className="w-5 h-5 mr-2" />
                                            <span>Orders</span>
                                        </div>
                                        <span>{org.orders}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <WalletIcon className="w-5 h-5 mr-2" />
                                            <span>Account Balance</span>
                                        </div>
                                        <span>${(org.accountBalance / 100).toFixed(2)}</span>
                                     </div>
                                 </div>
                                 <div className="mt-4">
                                     <h4 className="font-semibold">Products</h4>
                                     {org.products && org.products.length > 0 ? (
                                         <ul className="mt-2 space-y-2">
                                             {org.products.map((product: any) => (
                                                 <li key={product.id} className="p-2 border rounded-md">
                                                     <p className="font-semibold">{product.name}</p>
                                                     <p className="text-sm text-gray-500">{product.description}</p>
                                                 </li>
                                             ))}
                                         </ul>
                                     ) : (
                                         <p className="mt-2 text-sm text-gray-500">No products found.</p>
                                     )}
                                 </div>
                                 <a href={org.html_url} target="_blank" rel="noreferrer" className="block mt-4 text-blue-500 hover:underline">
                                     View on Polar
                                 </a>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No organizations found.</p>
                )}
            </div>
        </div>
    );
}
