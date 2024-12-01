import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Created with Next.js, TypeScript, and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${spaceMono.className} flex min-h-screen flex-col bg-background p-4`}
      >
        <main className="flex flex-1 flex-col px-4 py-6">
          <div className="flex-1 rounded-2xl bg-primary">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
