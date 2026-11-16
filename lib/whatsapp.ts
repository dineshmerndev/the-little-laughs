import { siteContact } from '@/config/site'

export const utmParameterKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export type UtmParameter = typeof utmParameterKeys[number]
export type UtmParameters = Partial<Record<UtmParameter, string>>

export function pickUtmParameters(searchParams: Record<string, unknown>): UtmParameters {
  const utmParameters: UtmParameters = {}

  for (const key of utmParameterKeys) {
    const rawValue = searchParams[key]
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue
    if (typeof value !== 'string') continue

    const sanitizedValue = value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 120)
    if (sanitizedValue) utmParameters[key] = sanitizedValue
  }

  return utmParameters
}

export function createWhatsAppUrl(message: string, utmParameters: UtmParameters = {}) {
  const trackingDetails = utmParameterKeys
    .filter(key => utmParameters[key])
    .map(key => `${key}=${utmParameters[key]}`)
  const prefilledMessage = trackingDetails.length
    ? `${message}\n\nCampaign tracking: ${trackingDetails.join(' | ')}`
    : message

  return `https://wa.me/${siteContact.whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`
}
