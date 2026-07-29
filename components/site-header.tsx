'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/find', label: 'Find a bench' },
  { href: '/story', label: 'The story' },
  { href: '/partners', label: 'For partners' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 rounded-sm font-serif text-xl font-semibold text-primary">
          <span aria-hidden className="text-2xl leading-none">&#9679;</span>
          Take a Seat
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors hover:bg-secondary',
                    active ? 'text-primary underline underline-offset-4' : 'text-foreground',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
          <li className="ml-2">
            <Button asChild>
              <Link href="/request">Request a bench</Link>
            </Button>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-secondary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-lg font-medium hover:bg-secondary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Button asChild className="w-full">
                <Link href="/request" onClick={() => setOpen(false)}>
                  Request a bench
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
