import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prisma + Vercel Runtime Verification',
  description: 'Testing Prisma Client with Edge and Node.js runtimes on Vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}