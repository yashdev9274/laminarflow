import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { prisma } from '@/app/utils/db';
import { auth } from '@/app/utils/auth';

const app = new Hono().basePath('/api/polar');

interface Organization {
    id: string;
    // Add other properties if needed
}

app.get('/organizations', async (c) => {
    console.log('Fetching organizations...');
    const session = await auth();

    if (!session?.user?.id) {
        console.log('Unauthorized: No session found');
        return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('User session found:', session.user.id);

    const polarAccount = await prisma.polarAccount.findFirst({
        where: {
            userId: session.user.id,
        },
    });

    if (!polarAccount) {
        console.log('Polar account not found for user:', session.user.id);
        return c.json({ error: 'Polar account not found' }, 404);
    }

    console.log('Polar account found. Fetching from Polar API...');

    try {
        const response = await fetch('https://api.polar.sh/v1/organizations', {
            headers: {
                Authorization: `Bearer ${polarAccount.organizationToken}`,
            },
        });

        console.log('Polar API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Polar API request failed:', errorText);
            return c.json({ error: 'Failed to fetch from Polar API', details: errorText }, 500);
        }

        const data = await response.json();

        let organizations = [];
        if (data && Array.isArray(data.items)) {
            organizations = data.items;
        } else if (Array.isArray(data)) {
            organizations = data;
        }

        const organizationsWithStats = await Promise.all(
            organizations.map(async (org: Organization) => {
                // Fetch metrics
                const metricsResponse = await fetch(`https://api.polar.sh/v1/metrics?organization_id=${org.id}`, {
                    headers: {
                        Authorization: `Bearer ${polarAccount.organizationToken}`,
                    },
                });
                const metricsData = await metricsResponse.json();

                // Fetch subscriptions
                const subscriptionsResponse = await fetch(`https://api.polar.sh/v1/subscriptions?organization_id=${org.id}&status=active`, {
                    headers: {
                        Authorization: `Bearer ${polarAccount.organizationToken}`,
                    },
                });
                const subscriptionsData = await subscriptionsResponse.json();

                // Fetch account balance
                const accountsResponse = await fetch(`https://api.polar.sh/v1/accounts?organization_id=${org.id}`, {
                    headers: {
                        Authorization: `Bearer ${polarAccount.organizationToken}`,
                    },
                });
                const accountsData = await accountsResponse.json();
                const accountBalance = accountsData.items?.[0]?.balance ?? 0;

                // Fetch products
                const productsResponse = await fetch(`https://api.polar.sh/v1/products?organization_id=${org.id}`, {
                    headers: {
                        Authorization: `Bearer ${polarAccount.organizationToken}`,
                    },
                });
                const productsData = await productsResponse.json();
                const products = productsData.items || [];


                return {
                    ...org,
                    revenue: metricsData.revenue?.total ?? 0,
                    activeSubscriptions: subscriptionsData.pagination.total_count ?? 0,
                    orders: metricsData.orders?.total ?? 0,
                    accountBalance: accountBalance,
                    products: products,
                };
            })
        );

        if (organizationsWithStats.length > 0) {
            return c.json(organizationsWithStats);
        }

        return c.json([]);

    } catch (error) {
        console.error('Error fetching from Polar API:', error);
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});

export const GET = handle(app);
