'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full px-4 py-6">
      <div className="bg-footer mx-auto w-full rounded-2xl">
        <div className="flex w-full items-center justify-between px-6 py-6 sm:py-8">
          <div className="flex flex-col items-center space-y-0.5">
            <p className="text-justify text-xs font-medium text-secondary sm:text-sm">
              reXplorer @ reown Frontend Challenge
            </p>
            <p className="text-justify text-xs text-secondary sm:text-sm">
              by Lucas Rimondi
            </p>
          </div>
          <Link
            href="https://github.com/lucasrimondi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/github-logo.png"
              alt="GitHub"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
