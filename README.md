# Prisma + Vercel Runtime Verification

This project verifies whether Prisma Client works with Node.js runtime in Vercel middleware and Edge functions, following Vercel's recent announcement that Node.js runtime is now stable in middleware.

## Test Setup

### Current Documentation (Edge Runtime Required)
- **Runtime**: `export const runtime = 'edge'`
- **Database**: Must use edge-compatible drivers (Neon, PlanetScale, libSQL)
- **Prisma**: Requires `driverAdapters` and specific adapters

### New Approach (Node.js Runtime)
- **Runtime**: Default Node.js runtime (no export needed)
- **Database**: Can potentially use regular database drivers
- **Prisma**: May work with regular PrismaClient without adapters

## Test Endpoints

1. `/api/edge-test` - Edge runtime with Neon adapter (current approach)
2. `/api/nodejs-test` - Node.js runtime with Neon adapter
3. `/api/edge-functions-nodejs` - Node.js runtime with regular PrismaClient

## Running Tests

1. Set up a Neon database and add `DATABASE_URL` to `.env`
2. Run `npm install`
3. Run `npx prisma db push`
4. Run `npm run dev`
5. Visit `http://localhost:3000` and click "Test All Runtimes"

## Expected Results

This will help determine if:
- Node.js runtime works with Prisma in middleware
- Node.js runtime works with Prisma in Edge functions  
- Regular PrismaClient works without adapters in Node.js runtime
- Documentation needs updates for the new approach