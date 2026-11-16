'use client'

import { useEffect, useRef, useState } from 'react'
import type { ProgramCampaign } from '@/data/campaigns'
import { activePrograms } from '@/data/programs'
import type { UtmParameters } from '@/lib/whatsapp'
import { trackProgramEvent } from '@/lib/program-analytics'
import ExpandingProgramCard from '@/components/programs/expanding-program-card'
import ProgramFAQ from '@/components/programs/program-faq'
import {
  LearningJourney,
  ProgramSelector,
  ProgramsFinalCTA,
  ProgramsHero,
  ConsultationSection,
} from '@/components/programs/sections'

type ProgramsPageProps = {
  campaign: ProgramCampaign | null
  utmParameters: UtmParameters
}

export default function ProgramsPage({ campaign, utmParameters }: ProgramsPageProps) {
  const [expandedProgramSlug, setExpandedProgramSlug] = useState<string | null>(campaign?.programSlug ?? null)
  const trackedViewRef = useRef<string | null>(null)

  useEffect(() => {
    const viewKey = campaign?.id ?? 'standard'
    if (trackedViewRef.current === viewKey) return
    trackedViewRef.current = viewKey
    trackProgramEvent('programs_page_viewed', { campaignId: campaign?.id })
  }, [campaign?.id])

  const pagePrograms = campaign
    ? [...activePrograms].sort((first, second) =>
      Number(second.slug === campaign.programSlug) - Number(first.slug === campaign.programSlug),
    )
    : activePrograms

  const openProgram = (slug: string) => {
    if (expandedProgramSlug !== slug) {
      trackProgramEvent('course_expanded', { programSlug: slug, campaignId: campaign?.id })
    }
    setExpandedProgramSlug(slug)
  }

  const toggleProgram = (slug: string) => {
    const shouldExpand = expandedProgramSlug !== slug
    if (shouldExpand) trackProgramEvent('course_expanded', { programSlug: slug, campaignId: campaign?.id })
    setExpandedProgramSlug(shouldExpand ? slug : null)
  }

  return <main className="programs-page">
    <ProgramsHero campaign={campaign} campaignId={campaign?.id} utmParameters={utmParameters} />
    <ProgramSelector
      campaignId={campaign?.id}
      onSelect={openProgram}
      utmParameters={utmParameters}
    />
    {pagePrograms.map(program => <ExpandingProgramCard
      key={program.slug}
      program={program}
      expanded={expandedProgramSlug === program.slug}
      featured={campaign?.programSlug === program.slug}
      campaignId={campaign?.id}
      campaignMessage={campaign?.programSlug === program.slug ? campaign.whatsappMessage : undefined}
      onToggle={() => toggleProgram(program.slug)}
      utmParameters={utmParameters}
    />)}
    <LearningJourney />
    <ConsultationSection campaignId={campaign?.id} utmParameters={utmParameters} />
    <ProgramFAQ campaignId={campaign?.id} utmParameters={utmParameters} />
    <ProgramsFinalCTA campaignId={campaign?.id} utmParameters={utmParameters} />
  </main>
}
