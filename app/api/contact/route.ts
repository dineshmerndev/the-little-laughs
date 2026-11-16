import { NextResponse } from 'next/server'
import { siteContact } from '@/config/site'

const rateLimitWindowMs = 60_000
const rateLimitMaxRequests = 3
const requestTimestamps = new Map<string, number[]>()

function getClientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? ''
  const ip = forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  return ip
}

function recordRequest(request: Request) {
  const key = getClientKey(request)
  const now = Date.now()
  const nextTimestamps = [...(requestTimestamps.get(key) ?? []), now].filter(
    (timestamp) => timestamp > now - rateLimitWindowMs,
  )

  if (nextTimestamps.length > rateLimitMaxRequests) {
    requestTimestamps.set(key, nextTimestamps)
    return false
  }

  requestTimestamps.set(key, nextTimestamps)
  return true
}

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim())
const isValidPhone = (value: string) => /^\+?[0-9\s()\-]{8,20}$/.test(value.trim())

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null)
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Your submission could not be read. Please try again.' }, { status: 400 })
    }

    const body = payload as Record<string, unknown>
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const enquiryType = typeof body.enquiryType === 'string' ? body.enquiryType.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const privacyConsent = body.privacyConsent === true

    if (!fullName || !email || !phone || !enquiryType || !message) {
      return NextResponse.json({ error: 'Please complete all required fields before submitting.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
    }

    if (!privacyConsent) {
      return NextResponse.json({ error: 'Please confirm the privacy notice before submitting.' }, { status: 400 })
    }

    if (!recordRequest(request)) {
      return NextResponse.json({ error: 'Too many enquiries received in a short period. Please try again in a minute.' }, { status: 429 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json({
        error: 'Email delivery is not configured yet. Please contact The Little Laughs via WhatsApp or email instead.',
        setupRequired: true,
      }, { status: 503 })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Little Laughs <onboarding@resend.dev>',
        to: [siteContact.email],
        reply_to: email,
        subject: `New enquiry from ${fullName} - ${enquiryType}`,
        text: [
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Enquiry Type: ${enquiryType}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      return NextResponse.json({ error: 'The enquiry could not be sent. Please try again or contact us directly.', details: errorText }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'The enquiry could not be processed. Please try again later.' }, { status: 500 })
  }
}
