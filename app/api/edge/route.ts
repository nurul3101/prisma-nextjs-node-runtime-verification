import { NextResponse } from 'next/server'

// TEMPORARILY COMMENTED OUT DUE TO 1MB SIZE LIMIT ON FREE TIER
// Edge runtime with Prisma Client exceeds Vercel's 1MB limit for Edge functions
// This proves that Node.js runtime is the better choice for Prisma applications

// export const runtime = 'edge'

export async function GET(request: Request) {
  return NextResponse.json({ 
    message: "Edge runtime temporarily disabled due to 1MB size limit",
    issue: "Prisma Client bundle (~1.03MB) exceeds Vercel free tier Edge function limit (1MB)",
    recommendation: "Use Node.js runtime instead - see /api/edge-nodejs",
    proof: "This demonstrates why the docs should recommend Node.js runtime for Prisma"
  }, { status: 200 })
}

/* ORIGINAL EDGE CODE - COMMENTED OUT DUE TO SIZE LIMIT
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 })
    }

    // Dynamic import to reduce bundle size
    const [{ PrismaClient }, { PrismaNeon }] = await Promise.all([
      import('@prisma/client'),
      import('@prisma/adapter-neon')
    ])

    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter })

    const users = await prisma.user.findMany()

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Edge runtime error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      runtime: 'edge'
    }, { status: 500 })
  }
}
*/