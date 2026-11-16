import type { Metadata } from 'next'
import JournalPage from '@/components/journal-page'

export const metadata: Metadata = {
  title: 'Journal | The Little Laughs',
  description: 'Explore thoughtful reads and practical guidance for pregnancy, breastfeeding, introducing solids and early parenting.',
}

export default function Page() {
  return <JournalPage />
}
