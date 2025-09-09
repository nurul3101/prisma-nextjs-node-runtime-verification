import { NextResponse } from 'next/server'

// Edge runtime version - lightweight without Prisma to demonstrate size limits
export const runtime = 'edge'

export async function GET(request: Request) {
  return NextResponse.json({ 
    message: "Edge runtime has 1MB size limit - Prisma Client is too large for Edge functions",
    recommendation: "Use Node.js runtime instead",
    runtime: 'edge',
    limitation: "This endpoint shows Edge runtime works, but cannot include Prisma due to size constraints"
  }, { status: 200 })
}