import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-3xl" tagline />
          <p className="mt-6 max-w-xs text-pretty text-muted-foreground">
            Old church pews, saved from the skip and given away free, so there&apos;s somewhere to
            sit down next to someone.
          </p>
          <p className="mt-4">
            <Link href="/request" className="font-medium text-primary underline underline-offset-4">
              Request a bench
            </Link>
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Pages</h2>
          <ul className="mt-3 flex flex-col gap-2">
            <li><Link href="/find" className="hover:text-primary hover:underline underline-offset-4">Find a bench</Link></li>
            <li><Link href="/story" className="hover:text-primary hover:underline underline-offset-4">The story</Link></li>
            <li><Link href="/partners" className="hover:text-primary hover:underline underline-offset-4">For partners</Link></li>
            <li><Link href="/about" className="hover:text-primary hover:underline underline-offset-4">About</Link></li>
            <li><Link href="/contact" className="hover:text-primary hover:underline underline-offset-4">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Behind it</h2>
          <p className="mt-3 text-muted-foreground">
            A project by{' '}
            <a
              href="https://refittr.co.uk"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              Refittr
            </a>{' '}
            and{' '}
            <a
              href="https://corkerysmithltd.com"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              Corkery Smith
            </a>
            , in Merseyside.
          </p>
          <div className="mt-4 flex items-center gap-5">
            <a
              href="https://refittr.co.uk"
              className="rounded-md transition-opacity hover:opacity-80"
            >
              <Image
                src="/logos/refittr.jpg"
                alt="Refittr"
                width={40}
                height={40}
                className="h-10 w-10 rounded-md"
              />
            </a>
            <a href="https://corkerysmithltd.com" className="transition-opacity hover:opacity-80">
              <Image
                src="/logos/corkery-smith.png"
                alt="Corkery Smith"
                width={150}
                height={30}
                className="h-6 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-muted-foreground">
          No cookies, no trackers. Just a website about benches.{' '}
          <a href="mailto:admin@refittr.co.uk" className="underline underline-offset-4">
            admin@refittr.co.uk
          </a>
        </p>
      </div>
    </footer>
  )
}
