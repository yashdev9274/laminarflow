import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { prisma } from '@/app/utils/db';
import { auth } from '@/app/utils/auth';


const app = new Hono().basePath('/api/polar/products');

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

    if (!polarAccount) {
        return c.json({ error: 'Polar account not found' }, 404);
    }

    // First, get the organizations for the user
    const orgsResponse = await fetch('https://api.polar.sh/v1/organizations', {
        headers: {
            Authorization: `Bearer ${polarAccount.organizationToken}`,
        },
    });

    const orgsData = await orgsResponse.json();
    const organizations = orgsData.items || [];

    let allProducts = [];

    for (const org of organizations) {
        const productsResponse = await fetch(`https://api.polar.sh/v1/products?organization_id=${org.id}`, {
            headers: {
                Authorization: `Bearer ${polarAccount.organizationToken}`,
            },
        });
        const productsData = await productsResponse.json();
        if (productsData.items) {
            allProducts = allProducts.concat(productsData.items);
        }
    }

    return c.json(allProducts);
});

export const GET = handle(app);
