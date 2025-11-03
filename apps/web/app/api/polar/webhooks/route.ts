import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { prisma } from '@/app/utils/db';
import { headers } from 'next/headers';
import crypto from 'crypto';

const app = new Hono().basePath('/api/polar/webhooks');

// You'll need to get this from your Polar webhook settings
const polarWebhookSecret = process.env.POLAR_WEBHOOK_SECRET;

app.post('/', async (c) => {
  if (!polarWebhookSecret) {
    console.error('POLAR_WEBHOOK_SECRET is not set.');
    return c.json({ error: 'Server configuration error.' }, 500);
  }

  const signature = headers().get('polar-signature');
  const body = await c.req.text();

  if (!signature) {
    return c.json({ error: 'Missing signature.' }, 400);
  }

  try {
    // Verify the webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', polarWebhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return c.json({ error: 'Invalid signature.' }, 400);
    }

    const event = JSON.parse(body);

    console.log('Received Polar Webhook:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'customer.created':
        const customerData = event.data;
        await prisma.polarCustomer.create({
          data: {
            id: customerData.id,
            email: customerData.email,
            name: customerData.name,
            organizationId: customerData.organization_id,
          },
        });
        break;
      // Add cases for other events like order.created, product.created, etc.
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return c.json({ error: 'Failed to process webhook.' }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
