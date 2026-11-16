'use client'

import { useState } from 'react'
import { ArrowRight, Minus, Plus } from 'lucide-react'
import { consultationDetails, siteContact } from '@/config/site'
import { activePrograms, formatProgramPrice } from '@/data/programs'
import type { UtmParameters } from '@/lib/whatsapp'
import { createWhatsAppUrl } from '@/lib/whatsapp'
import WhatsAppLink from '@/components/programs/whatsapp-link'

type ProgramFAQProps = {
  campaignId?: string
  utmParameters: UtmParameters
}

function commonProgramValue(selectValue: (program: typeof activePrograms[number]) => string) {
  return Array.from(new Set(activePrograms.map(selectValue))).join(' and ')
}

const durationLabel = activePrograms[0]?.duration.replace(/ hours?$/i, '-hour') ?? ''

const faqItems = [
  ...(activePrograms.length ? [
    {
      question: 'How long are the online courses?',
      answer: activePrograms.length === 1
        ? `The current online course is a ${durationLabel} ${activePrograms[0].schedule.toLowerCase()} session.`
        : `Both online courses are ${durationLabel} pre-recorded sessions.`,
    },
    {
      question: 'How long can I access a purchased course?',
      answer: `${activePrograms.length === 1 ? 'The current program provides' : 'Both programs provide'} ${commonProgramValue(program => program.access)} of access.`,
    },
    {
      question: 'Is WhatsApp support included?',
      answer: `Yes. ${activePrograms.length === 1 ? 'The current course includes' : 'Both courses include'} ${commonProgramValue(program => program.whatsappSupport)} of WhatsApp support.`,
    },
  ] : []),
  ...activePrograms.map(program => ({
    question: `What is the fee for ${program.title}?`,
    answer: `${formatProgramPrice(program.price)} plus ${program.taxNote}.`,
  })),
  {
    question: 'How can I book a personal consultation?',
    answer: `Contact The Little Laughs through WhatsApp at ${siteContact.displayPhone} to enquire about a ${consultationDetails.duration} ${consultationDetails.medium} consultation. The fee is ${formatProgramPrice(consultationDetails.price)} plus ${consultationDetails.taxNote}.`,
  },
  {
    question: 'What if I have a technical issue?',
    answer: (utmParameters: UtmParameters) => <>Contact <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> or WhatsApp <a href={createWhatsAppUrl('Hello The Little Laughs, I need help with a technical issue.', utmParameters)} target="_blank" rel="noreferrer">{siteContact.displayPhone}</a> for assistance.</>,
  },
]

export default function ProgramFAQ({ campaignId, utmParameters }: ProgramFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return <section className="program-faq-section" aria-labelledby="program-faq-title">
    <div className="wrap program-faq-grid">
      <div className="program-faq-intro">
        <span className="eyebrow">FAQ</span>
        <h2 id="program-faq-title">Good Questions, Honest Answers.</h2>
        <p>Here are a few things parents often ask before choosing a program.</p>
        <WhatsAppLink
          className="program-faq-contact"
          message="Hello The Little Laughs, I have a question about your programs."
          campaignId={campaignId}
          placement="faq"
          utmParameters={utmParameters}
        >
          Ask us directly <ArrowRight size={16} aria-hidden="true" />
        </WhatsAppLink>
      </div>
      <div className="program-faq-list">
        {faqItems.map(({ question, answer }, index) => {
          const expanded = activeIndex === index
          const questionId = `program-faq-question-${index}`
          const answerId = `program-faq-answer-${index}`

          return <div className="program-faq-item" key={question}>
            <h3>
              <button id={questionId} type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setActiveIndex(expanded ? null : index)}>
                <span>{question}</span>
                {expanded ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
              </button>
            </h3>
            <div className={`program-faq-answer${expanded ? ' is-open' : ''}`} id={answerId} role="region" aria-labelledby={questionId} aria-hidden={!expanded} inert={!expanded}>
              <div>{typeof answer === 'function' ? answer(utmParameters) : answer}</div>
            </div>
          </div>
        })}
      </div>
    </div>
  </section>
}
