import { cn } from '@/lib/utils'

// The bench under the wordmark: a plank on two legs, in brass.
// Drawn wide of the text and pulled back in with negative margins, so the
// overhang shows without taking up any extra room in the layout.
function BenchRule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 11"
      aria-hidden
      focusable="false"
      fill="currentColor"
      className={cn('w-[107%] -mx-[3.5%] text-brass', className)}
    >
      <rect x="0" y="0" width="200" height="3.9" rx="0.8" />
      <rect x="6.5" y="3.9" width="3.8" height="7.1" />
      <rect x="189.7" y="3.9" width="3.8" height="7.1" />
    </svg>
  )
}

type LogoProps = {
  className?: string
  /** The "Start a conversation" line beneath the bench. Left off in tight spots. */
  tagline?: boolean
}

/**
 * The main Take a Seat lockup: wordmark, brass bench, strapline.
 * Live text rather than an image, so it stays sharp and readable everywhere.
 * Size it by setting a font size on the element, e.g. <Logo className="text-3xl" />.
 */
export function Logo({ className, tagline = false }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex flex-col items-center font-serif text-xl font-semibold text-primary',
        className,
      )}
    >
      {/* leading-none lives on the text, not the wrapper: a text size passed in
          via className would otherwise merge it away. */}
      <span className="leading-none">Take a Seat</span>
      <BenchRule className="mt-[0.2em]" />
      {tagline && (
        <span className="-mr-[0.3em] mt-[1.3em] font-sans text-[0.34em] font-semibold uppercase leading-none tracking-[0.3em] text-foreground/70">
          Start a conversation
        </span>
      )}
    </span>
  )
}
