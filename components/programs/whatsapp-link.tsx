'use client'

import type { ReactNode } from 'react'
import type { ProgramAnalyticsEvent } from '@/lib/program-analytics'
import { trackProgramEvent } from '@/lib/program-analytics'
import { createWhatsAppUrl, type UtmParameters } from '@/lib/whatsapp'

type WhatsAppLinkProps = {
  children: ReactNode
  campaignId?: string
  className: string
  eventName?: ProgramAnalyticsEvent
  message: string
  placement: string
  programSlug?: string
  utmParameters: UtmParameters
}

export default function WhatsAppLink({
  children,
  campaignId,
  className,
  eventName = 'whatsapp_enquiry_clicked',
  message,
  placement,
  programSlug,
  utmParameters,
}: WhatsAppLinkProps) {
  return <a
    className={className}
    href={createWhatsAppUrl(message, utmParameters)}
    target="_blank"
    rel="noreferrer"
    onClick={() => trackProgramEvent(eventName, { programSlug, campaignId, placement })}
  >
    {children}
  </a>
}
