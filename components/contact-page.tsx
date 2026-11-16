'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, MessageCircle, X } from 'lucide-react'
import { siteContact } from '@/config/site'

type EnquiryType = 'General Enquiry' | 'Breastfeeding Made Simple' | 'Introducing Solids' | '1:1 Consultation' | 'Other'

type FormState = {
  fullName: string
  email: string
  phone: string
  enquiryType: EnquiryType | ''
  message: string
  privacyConsent: boolean
}

const initialValues: FormState = {
  fullName: '',
  email: '',
  phone: '',
  enquiryType: '',
  message: '',
  privacyConsent: false,
}

const enquiryOptions: EnquiryType[] = ['General Enquiry', 'Breastfeeding Made Simple', 'Introducing Solids', '1:1 Consultation', 'Other']

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim())
const isValidPhone = (value: string) => /^\+?[0-9\s()\-]{8,20}$/.test(value.trim())

export default function ContactPage() {
  const [formValues, setFormValues] = useState<FormState>(initialValues)
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const whatsappLink = useMemo(() => `https://wa.me/919597689086?text=${encodeURIComponent('Hello The Little Laughs, I would like to ask a question about your programs and support.')}`, [ ])

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus({ type: 'idle', message: '' })
  }

  const validateForm = () => {
    const nextErrors: Record<string, string> = {}
    if (!formValues.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!formValues.email.trim()) nextErrors.email = 'Please enter your email address.'
    else if (!isValidEmail(formValues.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!formValues.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    else if (!isValidPhone(formValues.phone)) nextErrors.phone = 'Please enter a valid phone number.'
    if (!formValues.enquiryType) nextErrors.enquiryType = 'Please select an enquiry type.'
    if (!formValues.message.trim()) nextErrors.message = 'Please add a short message.'
    if (!formValues.privacyConsent) nextErrors.privacyConsent = 'Please consent before sending your enquiry.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        const message = typeof payload?.error === 'string' ? payload.error : 'We could not send your enquiry right now. Please try again or contact us directly.'
        setStatus({ type: 'error', message })
        return
      }

      setStatus({ type: 'success', message: 'Thank You for Reaching Out!' })
      setFormValues(initialValues)
    } catch {
      setStatus({ type: 'error', message: 'We could not reach the server right now. Please try again later or contact us through WhatsApp.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="contact-page">
      <section className="section-shell contact-hero">
        <div className="wrap contact-hero-grid">
          <div>
            <span className="eyebrow">GET IN TOUCH</span>
            <h1>We&apos;re Here to Support Your Journey.</h1>
            <p>
              Have a question about our programs or need personalised guidance? We&apos;d love to hear from you. Reach out and let us help you take your next step with confidence.
            </p>
          </div>
          <div className="contact-hero-image">
            <Image src="/parent-consultation.png" alt="Mother speaking with a parenting educator" fill sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="wrap contact-layout">
          <div className="contact-info-panel">
            <span className="eyebrow">CONTACT</span>
            <h2>Let&apos;s Start a Conversation.</h2>
            <p>
              Whether you&apos;re looking for course information or personalised support, you can reach us through the following channels.
            </p>

            <div className="contact-detail-list">
              <a href={`tel:${siteContact.phone}`}>
                <span>WhatsApp / Phone</span>
                <strong>{siteContact.displayPhone}</strong>
              </a>
              <a href={`mailto:${siteContact.email}`}>
                <span>Primary email</span>
                <strong>{siteContact.email}</strong>
              </a>
              <a href={`mailto:${siteContact.secondaryEmail}`}>
                <span>Secondary email</span>
                <strong>{siteContact.secondaryEmail}</strong>
              </a>
            </div>

            <Link className="button button-dark contact-whatsapp-button" href={whatsappLink} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Chat With Us on WhatsApp
            </Link>
          </div>

          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form-grid">
                <label>
                  <span>Full Name</span>
                  <input value={formValues.fullName} onChange={(event) => updateField('fullName', event.target.value)} aria-invalid={Boolean(errors.fullName)} />
                  {errors.fullName && <small>{errors.fullName}</small>}
                </label>

                <label>
                  <span>Email Address</span>
                  <input type="email" value={formValues.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} />
                  {errors.email && <small>{errors.email}</small>}
                </label>

                <label>
                  <span>WhatsApp / Phone Number</span>
                  <input value={formValues.phone} onChange={(event) => updateField('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} />
                  {errors.phone && <small>{errors.phone}</small>}
                </label>

                <label>
                  <span>Enquiry Type</span>
                  <select value={formValues.enquiryType} onChange={(event) => updateField('enquiryType', event.target.value)} aria-invalid={Boolean(errors.enquiryType)}>
                    <option value="">Select an option</option>
                    {enquiryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.enquiryType && <small>{errors.enquiryType}</small>}
                </label>
              </div>

              <label className="contact-message-field">
                <span>Message</span>
                <textarea value={formValues.message} rows={5} onChange={(event) => updateField('message', event.target.value)} aria-invalid={Boolean(errors.message)} />
                {errors.message && <small>{errors.message}</small>}
              </label>

              <label className="contact-check-row">
                <input type="checkbox" checked={formValues.privacyConsent} onChange={(event) => updateField('privacyConsent', event.target.checked)} />
                <span>I understand that I should not share sensitive medical information through this form, and I consent to being contacted in response to my enquiry.</span>
              </label>
              {errors.privacyConsent && <small className="contact-checkbox-error">{errors.privacyConsent}</small>}

              {status.type === 'success' ? (
                <div className="contact-status success">
                  <CheckCircle2 size={16} />
                  <div>
                    <strong>Thank You for Reaching Out!</strong>
                    <span>Your enquiry has been submitted successfully. The Little Laughs will get back to you.</span>
                  </div>
                </div>
              ) : status.type === 'error' ? (
                <div className="contact-status error">
                  <X size={16} />
                  <div>
                    <strong>We couldn&apos;t send your enquiry</strong>
                    <span>{status.message}</span>
                  </div>
                </div>
              ) : null}

              <button type="submit" className="button button-dark contact-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-shell contact-cta-shell">
        <div className="wrap contact-cta-box">
          <div>
            <span className="eyebrow">SUPPORT</span>
            <h2>Every Little Question Deserves Support.</h2>
            <p>We&apos;re here to help you feel more informed and confident through every stage of your parenting journey.</p>
          </div>
          <Link className="button button-dark" href={whatsappLink} target="_blank" rel="noreferrer">
            Talk to Us on WhatsApp <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  )
}
