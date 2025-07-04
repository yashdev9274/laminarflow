import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '@/app/utils/db';
import { auth } from '@/app/utils/auth';


const schema = z.object({
    organizationToken: z.string(),
    developerApiToken: z.string(),
});

const app = new Hono().basePath('/api/polar/accounts');

app.post('/', zValidator('json', schema), async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const { organizationToken, developerApiToken } = c.req.valid('json');

    const polarAccount = await prisma.polarAccount.create({
        data: {
            userId: session.user.id,
            organizationToken,
            developerApiToken,
        },
    });

    return c.json(polarAccount);
});

export const POST = handle(app);
