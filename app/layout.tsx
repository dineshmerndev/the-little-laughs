import { Analytics } from '@vercel/analytics/next'
import { Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import MarketingAnalytics from '@/components/marketing-analytics'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'The Little Laughs | Parenting, Breastfeeding & Childbirth Support',
  description: 'Compassionate, evidence-informed pregnancy, breastfeeding and early parenting guidance with Vashini at The Little Laughs.',
  openGraph: {
    title: 'The Little Laughs | Parenting, Breastfeeding & Childbirth Support',
    description: 'Compassionate guidance for every step of your motherhood journey.',
    type: 'website',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf8f1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <MarketingAnalytics />
      </body>
    </html>
  )
}
