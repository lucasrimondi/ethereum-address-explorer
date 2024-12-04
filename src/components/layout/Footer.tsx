'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="xs:px-4 xs:py-6 w-full  px-2 py-2">
      <div className="mx-auto w-full rounded-3xl bg-footer">
        <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 sm:flex-row sm:py-8">
          <div className="flex flex-col space-y-0.5 text-center sm:text-left">
            <p className="text-xs text-secondary sm:text-base md:text-lg">
              reXplorer @ reown Frontend Challenge
            </p>
            <p className="text-xs text-secondary sm:text-base md:text-lg">
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
              className="h-8 w-8 transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
