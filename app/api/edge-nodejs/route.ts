import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// NO runtime export - using Node.js runtime (default)

export async function GET(request: Request) {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  const users = await prisma.user.findMany()

  return NextResponse.json(users, { status: 200 })
}