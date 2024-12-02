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
  title: 'reXplorer',
  description: 'explore your ethereum address',
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
        <main className="xs:px-4 xs:py-6 flex flex-1 flex-col px-2 py-2">
          <div className="rounded-3xl bg-primary">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
