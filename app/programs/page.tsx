import type { Metadata } from 'next'
import ProgramsPage from '@/components/programs-page'
import { campaigns } from '@/data/campaigns'
import { activePrograms } from '@/data/programs'
import { pickUtmParameters } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Programs | The Little Laughs',
  description: 'Explore practical, evidence-based breastfeeding and introducing solids programs from The Little Laughs.',
}

type SearchParams = Record<string, string | string[] | undefined>

export default async function ProgramsRoute({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const requestedCampaignId = Array.isArray(params.program) ? params.program[0] : params.program
  const campaign = campaigns.find(item =>
    item.id === requestedCampaignId
    && item.isActive
    && activePrograms.some(program => program.slug === item.programSlug),
  ) ?? null

  return <ProgramsPage campaign={campaign} utmParameters={pickUtmParameters(params)} />
}
