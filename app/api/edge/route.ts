import { NextResponse } from 'next/server'

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