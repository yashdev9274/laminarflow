'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <div>
            <h1 className="text-2xl font-bold">Organizations</h1>
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {organizations.length > 0 ? (
                    organizations.map((org: any) => (
                        <Card key={org.id}>
                            <CardHeader>
                                <CardTitle>{org.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{org.bio}</p>
                                <a href={org.html_url} target="_blank" rel="noreferrer">
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
