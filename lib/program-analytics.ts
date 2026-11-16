import { track } from '@vercel/analytics'

export type ProgramAnalyticsEvent =
  | 'programs_page_viewed'
  | 'course_section_viewed'
  | 'course_expanded'
  | 'whatsapp_enquiry_clicked'
  | 'consultation_enquiry_clicked'

type ProgramAnalyticsDetails = {
  programSlug?: string
  campaignId?: string
  placement?: string
}

type AnalyticsWindow = Window & {
  gtag?: (command: 'event', eventName: string, properties: Record<string, string>) => void
  fbq?: (command: 'trackCustom', eventName: string, properties: Record<string, string>) => void
}

export function trackProgramEvent(event: ProgramAnalyticsEvent, details: ProgramAnalyticsDetails = {}) {
  if (typeof window === 'undefined') return

  const properties: Record<string, string> = {}
  if (details.programSlug) properties.program_slug = details.programSlug
  if (details.campaignId) properties.campaign_id = details.campaignId
  if (details.placement) properties.placement = details.placement

  track(event, properties)

  const analyticsWindow = window as AnalyticsWindow
  analyticsWindow.gtag?.('event', event, properties)
  analyticsWindow.fbq?.('trackCustom', event, properties)
}
