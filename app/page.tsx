'use client'

import { useState } from 'react'

export default function HomePage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)

  const testEndpoint = async (endpoint: string, name: string) => {
    setLoading(name)
    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      setResults((prev: any) => ({
        ...prev,
        [name]: { status: response.status, data }
      }))
    } catch (error) {
      setResults((prev: any) => ({
        ...prev,
        [name]: { 
          status: 500, 
          data: { 
            error: error instanceof Error ? error.message : 'Network error' 
          } 
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const testAll = async () => {
    await testEndpoint('/api/edge', 'Edge Runtime (with Prisma)')
    await testEndpoint('/api/edge-lightweight', 'Edge Runtime (lightweight)')
    await testEndpoint('/api/edge-nodejs', 'Node.js Runtime (with Prisma)')  
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Prisma + Vercel Edge Runtime Verification</h1>
      <p>Testing the exact example from Prisma docs with and without edge runtime</p>
      
      <div style={{ margin: '2rem 0', backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <h3>Testing Documentation Example:</h3>
        <pre style={{ fontSize: '0.9em', overflow: 'auto' }}>
{`// Docs example - WITH edge runtime
export const runtime = 'edge'
export async function GET(request: Request) {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })
  const users = await prisma.user.findMany()
  return NextResponse.json(users, { status: 200 })
}

// Modified example - WITHOUT edge runtime
export async function GET(request: Request) {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })
  const users = await prisma.user.findMany()
  return NextResponse.json(users, { status: 200 })
}`}
        </pre>
      </div>
      
      <div style={{ margin: '2rem 0' }}>
        <button onClick={testAll} disabled={!!loading} style={{ 
          padding: '0.5rem 1rem', 
          margin: '0.5rem',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          {loading ? `Testing ${loading}...` : 'Test Both Versions'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {Object.entries(results).map(([name, result]: [string, any]) => (
          <div key={name} style={{ 
            border: '1px solid #ddd', 
            padding: '1rem', 
            borderRadius: '8px',
            backgroundColor: result.status === 200 ? '#f0f8ff' : '#ffe4e1'
          }}>
            <h3>{name}</h3>
            <p><strong>Status:</strong> {result.status}</p>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.9em'
            }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </main>
  )
}