export type ProgramCampaign = {
  id: string
  programSlug: string
  campaignHeadline?: string
  campaignDescription?: string
  heroImage?: string
  heroImageAlt?: string
  primaryCTALabel?: string
  whatsappMessage?: string
  isActive: boolean
}

export const campaigns: ProgramCampaign[] = [
  {
    id: 'breastfeeding',
    programSlug: 'breastfeeding-made-simple',
    campaignHeadline: 'Feel More Confident About Breastfeeding.',
    campaignDescription: 'Practical, evidence-based learning to help you understand breastfeeding, build confidence and navigate common feeding challenges.',
    heroImage: '/mother-newborn.png',
    heroImageAlt: 'A mother holding her newborn close',
    primaryCTALabel: 'Explore Breastfeeding Made Simple',
    whatsappMessage: 'Hello The Little Laughs, I would like to know more about Breastfeeding Made Simple.',
    isActive: true,
  },
  {
    id: 'introducing-solids',
    programSlug: 'introducing-solids',
    campaignHeadline: 'Start Solids With Confidence.',
    campaignDescription: 'A practical guide to readiness, feeding approaches, first foods and positive mealtime habits.',
    heroImage: '/introducing-solids.png',
    heroImageAlt: 'A parent offering age-appropriate food to a baby',
    primaryCTALabel: 'Explore Introducing Solids',
    whatsappMessage: 'Hello The Little Laughs, I would like to know more about the Introducing Solids program.',
    isActive: true,
  },
]
