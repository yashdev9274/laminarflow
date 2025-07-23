# Use official Node.js LTS image
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies only when needed
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN pnpm exec prisma generate

# Copy rest of the app
COPY . .

# Build Next.js app
RUN pnpm build

# Production image
FROM node:20-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app ./

EXPOSE 3000

CMD ["pnpm", "start"]