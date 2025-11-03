import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '@/app/utils/db';
import { auth } from '@/app/utils/auth';

const schema = z.object({
    organizationToken: z.string(),
});

const app = new Hono().basePath('/api/polar/accounts');

app.post('/', zValidator('json', schema), async (c) => {
    const session = await auth();
    console.log('POST /api/polar/accounts');

    if (!session?.user?.id) {
        console.error('Unauthorized: No session found');
        return c.json({ error: 'Unauthorized' }, 401);
    }
    console.log('Session found for user:', session.user.id);

    const { organizationToken } = c.req.valid('json');
    console.log('Received organization token.');

    try {
        const response = await fetch('https://api.polar.sh/v1/organizations', {
            headers: {
                Authorization: `Bearer ${organizationToken}`,
            },
        });

        console.log('Polar API response status:', response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Polar API request failed:', errorText);
            return c.json({ error: 'Invalid token' }, 401);
        }

        const data = await response.json();
        console.log('Polar API response data:', JSON.stringify(data, null, 2));

        let organizations = [];
        if (data && Array.isArray(data.items)) {
            organizations = data.items;
        } else if (Array.isArray(data)) {
            organizations = data;
        }

        console.log('Parsed organizations count:', organizations.length);

        if (organizations.length === 0) {
            console.error('No organizations found for this token');
            return c.json({ error: 'No organizations found for this token' }, 404);
        }

        const organization = organizations[0];
        console.log('Selected organization:', JSON.stringify(organization, null, 2));

        if (!organization || !organization.id || !organization.name) {
            console.error('Selected organization is missing required fields (id, name).');
            return c.json({ error: 'Invalid organization data received from Polar' }, 500);
        }

        const upsertPayload = {
            where: { userId: session.user.id },
            update: {
                organizationToken,
                organizationId: organization.id,
                organizationName: organization.name,
            },
            create: {
                userId: session.user.id,
                organizationToken,
                organizationId: organization.id,
                organizationName: organization.name,
            },
        };

        console.log('Prisma upsert payload:', JSON.stringify(upsertPayload, null, 2));

        const polarAccount = await prisma.polarAccount.upsert(upsertPayload);

        console.log('Successfully upserted Polar account.');
        return c.json(polarAccount);

    } catch (error) {
        console.error('An unexpected error occurred in /api/polar/accounts:', error);
        // Check if error is an object and has a code property
        const errorCode = error && typeof error === 'object' && 'code' in error ? error.code : 'UNKNOWN';
        return c.json({ error: 'An unexpected server error occurred.', code: errorCode }, 500);
    }
});

app.get('/', async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const polarAccount = await prisma.polarAccount.findFirst({
        where: {
            userId: session.user.id,
        },
    });

    return c.json(polarAccount);
});

app.delete('/', async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    await prisma.polarAccount.deleteMany({
        where: {
            userId: session.user.id,
        },
    });

    return c.json({ message: 'Polar account deleted' });
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
