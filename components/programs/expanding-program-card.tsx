'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowUpRight, Check, ChevronDown, MessageCircle, Minus, Plus } from 'lucide-react'
import type { Program } from '@/data/programs'
import { formatProgramPrice } from '@/data/programs'
import type { UtmParameters } from '@/lib/whatsapp'
import { trackProgramEvent } from '@/lib/program-analytics'
import WhatsAppLink from '@/components/programs/whatsapp-link'

type ExpandingProgramCardProps = {
  campaignId?: string
  campaignMessage?: string
  expanded: boolean
  featured: boolean
  onToggle: () => void
  program: Program
  utmParameters: UtmParameters
}

function CourseInformation({ program }: { program: Program }) {
  const information = [
    ['Duration', program.duration],
    ['Schedule', `${program.schedule} session`],
    ['Access', program.access],
    ['WhatsApp Support', program.whatsappSupport],
    ['Fee', `${formatProgramPrice(program.price)} + ${program.taxNote}`],
  ]

  return <div className="program-course-information">
    <h3>Course Information</h3>
    <dl>
      {information.map(([label, value]) => <div key={label}>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>)}
    </dl>
  </div>
}

function LearningOutcomes({ outcomes }: { outcomes: string[] }) {
  return <div className="program-learning-outcomes">
    <h3>What You&apos;ll Learn</h3>
    <ul>
      {outcomes.map(outcome => <li key={outcome}>
        <Check size={16} aria-hidden="true" />
        <span>{outcome}</span>
      </li>)}
    </ul>
  </div>
}

export default function ExpandingProgramCard({
  campaignId,
  campaignMessage,
  expanded,
  featured,
  onToggle,
  program,
  utmParameters,
}: ExpandingProgramCardProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const viewedRef = useRef(false)
  const detailsId = `program-details-${program.slug}`

  useEffect(() => {
    const node = sectionRef.current
    if (!node || viewedRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || viewedRef.current) return
      viewedRef.current = true
      trackProgramEvent('course_section_viewed', { programSlug: program.slug, campaignId })
      observer.disconnect()
    }, { threshold: 0.1 })

    observer.observe(node)
    return () => observer.disconnect()
  }, [campaignId, program.slug])

  return <section
    ref={sectionRef}
    className={`program-course program-course-${program.tone}${featured ? ' is-featured' : ''}`}
    id={program.slug}
    aria-labelledby={`${detailsId}-title`}
  >
    <div className="wrap">
      <div className="program-course-overview">
        <button className="program-course-image" type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={detailsId} aria-label={`${expanded ? 'Collapse' : 'Explore'} ${program.title} details`}>
          <Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 760px) 100vw, 48vw" />
          <span>{program.tone === 'sage' ? 'BREASTFEEDING EDUCATION' : 'INTRODUCING SOLIDS'}</span>
        </button>
        <div className="program-course-summary">
          <span className="eyebrow">{program.tone === 'sage' ? 'ONLINE PROGRAM' : 'COMPLEMENTARY FEEDING'}</span>
          <h2 id={`${detailsId}-title`}>{program.title}</h2>
          {program.subtitle && <p className="program-course-subtitle">{program.subtitle}</p>}
          <p className="program-course-audience">{program.audience}</p>
          <p className="program-course-description">{program.description}</p>
          <div className="program-course-price">
            <span>Course fee</span>
            <strong>{formatProgramPrice(program.price)}</strong>
            <small>+ {program.taxNote}</small>
          </div>
          <div className="program-course-facts" aria-label="Course details">
            <span>{program.duration}</span>
            <span>{program.schedule}</span>
            <span>{program.access} access</span>
            <span>{program.whatsappSupport} WhatsApp support</span>
          </div>
          <button className="program-course-toggle" type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={onToggle}>
            <span>{expanded ? 'Show Less' : 'Explore Course Details'}</span>
            {expanded ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className={`program-course-expansion${expanded ? ' is-expanded' : ''}`} id={detailsId} aria-hidden={!expanded} inert={!expanded}>
        <div className="program-course-expansion-inner">
          <div className="program-course-expanded-grid">
            <LearningOutcomes outcomes={program.learningOutcomes} />
            <CourseInformation program={program} />
          </div>
          <WhatsAppLink
            className="button button-dark program-course-enquiry"
            message={campaignMessage || program.whatsappMessage}
            programSlug={program.slug}
            campaignId={campaignId}
            placement="course"
            utmParameters={utmParameters}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Enquire on WhatsApp
            <ArrowUpRight size={15} aria-hidden="true" />
          </WhatsAppLink>
          <button className="program-course-collapse" type="button" onClick={onToggle}>
            Show Less <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
}
