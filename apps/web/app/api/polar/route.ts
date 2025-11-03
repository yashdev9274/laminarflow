import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { prisma } from '@/app/utils/db';
import { auth } from '@/app/utils/auth';

if (!process.env.POLAR_API_BASE_URL) {
    throw new Error('POLAR_API_BASE_URL is not set');
}

const app = new Hono().basePath('/api/polar');

app.get('/organizations', async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const polarAccount = await prisma.polarAccount.findFirst({
        where: {
            userId: session.user.id,
        },
    });

    if (!polarAccount) {
        return new Response(JSON.stringify({ error: 'Polar account not found' }), { status: 404 });
    }

    const response = await fetch(`${process.env.POLAR_API_BASE_URL}/organizations`, {
        headers: {
            Authorization: `Bearer ${polarAccount.organizationToken}`,
        },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data));
});

export const GET = handle(app);
export const POST = handle(app);
