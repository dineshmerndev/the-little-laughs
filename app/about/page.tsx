import type { Metadata } from 'next'
import AboutPage from '@/components/about-page'

export const metadata: Metadata = {
  title: 'About | The Little Laughs',
  description: 'Meet Vashini and learn about the mission, professional training and approach behind The Little Laughs.',
}

export default function Page() {
  return <AboutPage />
}
