import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { QueryProvider } from '@/lib/providers/QueryProvider'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'reXplorer',
  description: 'explore your ethereum address',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${spaceMono.className} flex min-h-screen flex-col gap-4 sm:p-6`}
      >
        <QueryProvider>
          <main className="xs:px-4 xs:py-6 flex flex-1 flex-col px-2 py-2">
            <div className="rounded-3xl bg-primary">{children}</div>
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
