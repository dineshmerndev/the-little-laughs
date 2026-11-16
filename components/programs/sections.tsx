import Image from 'next/image'
import { ArrowDownRight, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import { consultationDetails, generalProgramsMessage, siteContact } from '@/config/site'
import type { ProgramCampaign } from '@/data/campaigns'
import { activePrograms, formatProgramPrice } from '@/data/programs'
import type { UtmParameters } from '@/lib/whatsapp'
import WhatsAppLink from '@/components/programs/whatsapp-link'

type SharedSectionProps = {
  campaignId?: string
  utmParameters: UtmParameters
}

export function ProgramsHero({
  campaign,
  utmParameters,
}: SharedSectionProps & { campaign: ProgramCampaign | null }) {
  const featuredProgram = campaign
    ? activePrograms.find(program => program.slug === campaign.programSlug)
    : undefined
  const message = campaign?.whatsappMessage || generalProgramsMessage
  const destination = featuredProgram ? `#${featuredProgram.slug}` : '#program-selector'

  return <section className="programs-hero" aria-labelledby="programs-hero-title">
    <div className="wrap programs-hero-layout">
      <div className="programs-hero-copy">
        <span className="eyebrow">{campaign ? 'A LITTLE MORE SUPPORT FOR YOUR JOURNEY' : 'THE LITTLE LAUGHS · OUR PROGRAMS'}</span>
        <h1 id="programs-hero-title">{campaign?.campaignHeadline || 'Practical Guidance for Your Parenting Journey.'}</h1>
        <p>{campaign?.campaignDescription || 'Thoughtful, evidence-informed programs to help you feel more confident through breastfeeding, starting solids and early parenthood.'}</p>
        <p className="programs-hero-support">Learn at your own pace, with guidance shaped by both professional knowledge and real-life parenting.</p>
        <div className="programs-hero-actions">
          <a className="button button-dark" href={destination}>
            {campaign?.primaryCTALabel || 'Explore Our Programs'}
            <ArrowDownRight size={16} aria-hidden="true" />
          </a>
          <WhatsAppLink
            className="programs-hero-whatsapp"
            message={message}
            campaignId={campaign?.id}
            programSlug={campaign?.programSlug}
            placement="hero"
            utmParameters={utmParameters}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Ask us a question
          </WhatsAppLink>
        </div>
      </div>
      <div className="programs-hero-image">
        <Image
          src={campaign?.heroImage || '/mother-newborn.png'}
          alt={campaign?.heroImageAlt || 'A mother holding her newborn close'}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 48vw"
        />
        <span className="programs-hero-image-caption">PERSONAL, PRACTICAL SUPPORT FOR PARENTS</span>
      </div>
    </div>
  </section>
}

export function ProgramSelector({
  campaignId,
  onSelect,
  utmParameters,
}: SharedSectionProps & { onSelect: (slug: string) => void }) {
  return <section className="program-selector section" id="program-selector" aria-labelledby="program-selector-title">
    <div className="wrap">
      <div className="program-selector-intro">
        <div>
          <span className="eyebrow">CHOOSE YOUR NEXT STEP</span>
          <h2 id="program-selector-title">Support for the Moments That Matter.</h2>
        </div>
        <p>Whether you&apos;re preparing to breastfeed or beginning your baby&apos;s food journey, find thoughtful guidance for the stage you&apos;re in.</p>
      </div>
      <div className="program-selector-grid">
        {activePrograms.map((program, index) => <article className={`program-selector-card program-selector-${program.tone}`} key={program.slug}>
          <a className="program-selector-image" href={`#${program.slug}`} onClick={() => onSelect(program.slug)} aria-label={`View ${program.title}`}>
            <Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
            <span>PROGRAM {String(index + 1).padStart(2, '0')}</span>
          </a>
          <div className="program-selector-content">
            <span className="eyebrow">{program.tone === 'sage' ? 'BREASTFEEDING SUPPORT' : 'STARTING SOLIDS'}</span>
            <h3>{program.title}</h3>
            <p>{program.subtitle || program.audience}</p>
            <div className="program-selector-meta">
              <span>{program.duration}</span>
              <span>{program.schedule}</span>
              <span>{program.access} access</span>
            </div>
            <div className="program-selector-footer">
              <span><small>Course fee</small><strong>{formatProgramPrice(program.price)}</strong></span>
              <a className="text-link" href={`#${program.slug}`} onClick={() => onSelect(program.slug)}>
                Explore program <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>)}
      </div>
      <p className="program-selector-note">All programs are online and include personal WhatsApp support.</p>
    </div>
  </section>
}

export function LearningJourney() {
  const steps = [
    { number: '01', title: 'Choose your program', description: 'Find the guidance that fits your current stage and the questions on your mind.' },
    { number: '02', title: 'Learn at your own pace', description: 'Access your pre-recorded session and revisit the practical guidance as you need it.' },
    { number: '03', title: 'Feel supported', description: 'Use your included WhatsApp support to ask questions as you put what you learn into practice.' },
  ]

  return <section className="programs-journey section" aria-labelledby="programs-journey-title">
    <div className="wrap">
      <div className="programs-journey-intro">
        <span className="eyebrow">SIMPLE, SUPPORTIVE LEARNING</span>
        <h2 id="programs-journey-title">A Little Guidance, One Step at a Time.</h2>
        <p>Practical learning that meets you where you are.</p>
      </div>
      <ol className="programs-journey-steps">
        {steps.map(step => <li key={step.number}>
          <span className="programs-journey-number">{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>)}
      </ol>
    </div>
  </section>
}

export function ConsultationSection({ campaignId, utmParameters }: SharedSectionProps) {
  return <section className="programs-consultation section" aria-labelledby="programs-consultation-title">
    <div className="wrap programs-consultation-layout">
      <div className="programs-consultation-image">
        <Image src="/parent-consultation.png" alt="A parent speaking with an educator during an online consultation" fill sizes="(max-width: 760px) 100vw, 48vw" />
      </div>
      <div className="programs-consultation-copy">
        <span className="eyebrow">PERSONAL SUPPORT</span>
        <h2 id="programs-consultation-title">Prefer One-to-One Guidance?</h2>
        <p>Every family&apos;s journey is different. Book a personal conversation with Vashini to talk through your questions and receive support shaped around your needs.</p>
        <ul className="programs-consultation-details">
          <li><span>Session</span><strong>{consultationDetails.duration} {consultationDetails.medium} consultation</strong></li>
          <li><span>Fee</span><strong>{formatProgramPrice(consultationDetails.price)} + {consultationDetails.taxNote}</strong></li>
        </ul>
        <WhatsAppLink
          className="button button-dark"
          message={consultationDetails.whatsappMessage}
          campaignId={campaignId}
          placement="consultation"
          eventName="consultation_enquiry_clicked"
          utmParameters={utmParameters}
        >
          <MessageCircle size={16} aria-hidden="true" />
          Enquire About a Consultation
          <ArrowUpRight size={15} aria-hidden="true" />
        </WhatsAppLink>
        <p className="programs-consultation-contact">Or call <a href={`tel:${siteContact.phone}`}>{siteContact.displayPhone}</a></p>
      </div>
    </div>
  </section>
}

export function ProgramsFinalCTA({ campaignId, utmParameters }: SharedSectionProps) {
  return <section className="programs-final-cta" aria-labelledby="programs-final-cta-title">
    <div className="wrap programs-final-cta-inner">
      <span className="eyebrow">HERE FOR YOU, EVERY STEP OF THE WAY</span>
      <h2 id="programs-final-cta-title">You Don&apos;t Have to Figure It All Out Alone.</h2>
      <p>Explore a program or reach out. We&apos;re here to help you find the right support for your family.</p>
      <div className="programs-final-cta-actions">
        <a className="button button-cream" href="#program-selector">
          Explore Our Programs <ArrowRight size={16} aria-hidden="true" />
        </a>
        <WhatsAppLink
          className="programs-final-whatsapp"
          message={generalProgramsMessage}
          campaignId={campaignId}
          placement="final_cta"
          utmParameters={utmParameters}
        >
          <MessageCircle size={16} aria-hidden="true" />
          Talk to Us
        </WhatsAppLink>
      </div>
    </div>
  </section>
}
