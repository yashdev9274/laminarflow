import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { prisma } from '@/app/utils/db';
import { auth } from '@/app/utils/auth';

const app = new Hono().basePath('/api/polar');

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
        console.log('Data received from Polar API:', JSON.stringify(data, null, 2));

        // The Polar API might return an object with an 'items' array
        if (data && Array.isArray(data.items)) {
            console.log('Returning items array.');
            return c.json(data.items);
        }

        // Or it might return a direct array
        if (Array.isArray(data)) {
            console.log('Returning direct array.');
            return c.json(data);
        }

        console.log('Unexpected data format from Polar API. Returning empty array.');
        return c.json([]);

    } catch (error) {
        console.error('Error fetching from Polar API:', error);
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});

export const GET = handle(app);
