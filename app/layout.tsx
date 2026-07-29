import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://takeaseat.org.uk'),
  title: {
    default: 'Take a Seat - a bench to sit next to someone',
    template: '%s · Take a Seat',
  },
  description:
    'Old church pews, saved from the skip and given away free to the places people go to be a little less alone. Request a bench for your community.',
  generator: 'v0.app',
  openGraph: {
    title: 'Take a Seat - a bench to sit next to someone',
    description:
      'Old church pews, saved from the skip and given away free to the places people go to be a little less alone.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f1e8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={`light ${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
