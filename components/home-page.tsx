'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, Minus, Plus } from 'lucide-react'
import { consultationDetails, generalProgramsMessage, siteContact } from '@/config/site'
import { activePrograms as programs, formatProgramPrice } from '@/data/programs'
import { createWhatsAppUrl } from '@/lib/whatsapp'

const CONTACT = siteContact
const whatsapp = (message: string) => createWhatsAppUrl(message)

const educatorQualifications: { name: string; title: string; detail?: string }[] = [
  { name: 'CAPPA', title: 'Certified Childbirth Educator' },
  { name: 'BEGIN ED INDIA', title: 'Advanced Certified Lactation Professional' },
  { name: 'BPNI', title: 'Infant & Young Child Feeding Counsellor', detail: 'Breastfeeding Promotion Network of India' },
]

const services = [
  { title: 'Pregnancy & childbirth education', description: 'Prepare for childbirth with practical knowledge, guidance and a better understanding of what to expect.', href: '#courses', className: 'service-featured', label: 'PREPARE WITH CONFIDENCE', image: '/pregnancy-support.png', imageAlt: 'Expectant parent preparing for childbirth' },
  { title: 'Breastfeeding support', description: 'Understand breastfeeding, build confidence and navigate common feeding challenges with the right guidance.', href: '#program-breastfeeding', className: 'service-breastfeeding', label: 'FEEDING SUPPORT', image: '/mother-newborn.png', imageAlt: 'Mother holding her newborn close' },
  { title: 'Introducing solids', description: "Learn how to begin your baby's food journey with informed and positive feeding practices.", href: '#program-solids', className: 'service-solids', label: 'A POSITIVE FIRST BITE', image: '/introducing-solids.png', imageAlt: 'Parent introducing soft foods to a baby' },
  { title: '1:1 consultation', description: 'Get personalised guidance for your individual parenting and feeding concerns.', href: '#contact', className: 'service-consultation', label: 'PERSONALISED CARE', image: '/parent-consultation.png', imageAlt: 'Parent speaking with a parenting educator' },
  { title: 'Parenting guidance', description: 'Navigate early parenting with practical information, encouragement and evidence-based support.', href: '#about', className: 'service-parenting', label: 'SUPPORT FOR THE EVERYDAY', image: '/mother-newborn.png', imageAlt: 'Mother holding her newborn close' },
  { title: 'Educational workshops', description: 'Learn through engaging educational sessions that make parenting information more accessible.', href: '#impact', className: 'service-workshops', label: 'LEARN TOGETHER', image: '/pregnancy-support.png', imageAlt: 'Expectant parent preparing for childbirth' },
]

const sharedProgramValue = (selector: (program: typeof programs[number]) => string) => {
  const values = Array.from(new Set(programs.map(selector)))
  return values.length === 1 ? values[0] : values.join(' or ')
}

const programFaqs: Array<[string, string]> = programs.length ? [
  [
    programs.length === 1 ? 'How long is the online course?' : 'How long are the online courses?',
    `${programs.length === 1 ? 'The online course is' : 'Both online courses are'} ${programs[0].duration.replace(/ hours?$/i, '-hour')} ${programs[0].schedule.toLowerCase()} sessions.`,
  ],
  [
    'How long can I access a purchased course?',
    `Course access is provided for ${sharedProgramValue(program => program.access)}.`,
  ],
  [
    'Is WhatsApp support included?',
    `Yes. Courses include ${sharedProgramValue(program => program.whatsappSupport)} of WhatsApp support.`,
  ],
  ...programs.map((program): [string, string] => [
    `What is the fee for ${program.title}?`,
    `${formatProgramPrice(program.price)} plus ${program.taxNote}.`,
  ]),
] : []

const faqs: Array<[string, string]> = [
  ...programFaqs,
  [
    'How can I book a personal consultation?',
    `Contact The Little Laughs through WhatsApp at ${CONTACT.displayPhone} to enquire about a ${consultationDetails.duration} ${consultationDetails.medium} consultation. The fee is ${formatProgramPrice(consultationDetails.price)} plus ${consultationDetails.taxNote}.`,
  ],
  ['What if I have a technical issue?', `Contact ${CONTACT.email} or WhatsApp ${CONTACT.displayPhone} for assistance.`],
]

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-intro">
    <Eyebrow>{eyebrow}</Eyebrow>
    <div className="intro-row">
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  </div>
}

function HeroSection() {
  return <section className="hero" id="home">
    <Image className="hero-image" src="/mother-newborn.png" alt="Mother holding her newborn close at home" fill priority sizes="100vw" />
    <div className="hero-shade" />
    <div className="hero-content wrap">
      <div className="hero-heading">
        <Eyebrow>PREGNANCY · FEEDING · EARLY PARENTING</Eyebrow>
        <h1>Care for every part of motherhood.</h1>
      </div>
      <div className="hero-support">
        <p>Thoughtful guidance for pregnancy, feeding and early parenting, tailored to you.</p>
        <div className="hero-actions">
          <a className="button button-hero" href="#contact">
            <span>Book a consult</span>
            <span className="button-hero-icon"><ArrowRight size={16} /></span>
          </a>
        </div>
      </div>
    </div>
    <a className="hero-scroll" href="#impact" aria-label="Scroll to our impact"><ArrowDownRight size={19} /></a>
  </section>
}

function AnimatedStat({ value, label, color, delay = 0 }: { value: number; label: string; color: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value)
        return
      }
      const startedAt = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / 1100, 1)
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 4))))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.25 })
    observer.observe(node)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [value])

  return <div ref={ref} className={`impact-stat ${color}`} style={{ animationDelay: `${delay}ms` }}>
    <strong>{count.toLocaleString('en-IN')}+</strong>
    <span>{label}</span>
  </div>
}

function ImpactSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>()
  return <section ref={ref} className={`section impact-section wrap${visible ? ' is-visible' : ''}`} id="impact">
    <SectionIntro eyebrow="OUR IMPACT" title="Making a Difference, One Family at a Time." copy="Every number represents a mother supported, a family empowered and a parent who feels more confident. Through professional guidance and evidence-based education, The Little Laughs supports families through every stage of their parenting journey." />
    <div className="impact-bento reveal-group">
      <div className="impact-photo impact-photo-large">
        <Image src="/mother-newborn.png" alt="A mother sharing a quiet moment with her newborn" fill sizes="(max-width: 700px) 100vw, 33vw" />
        <span>CARE FOR EVERY LITTLE BEGINNING</span>
      </div>
      <AnimatedStat value={10000} label="Mothers supported" color="impact-forest" />
      <AnimatedStat value={200} label="Workshops conducted" color="impact-sage" delay={100} />
      <div className="impact-photo impact-photo-small">
        <Image src="/introducing-solids.png" alt="A parent introducing soft foods to their baby" fill sizes="(max-width: 700px) 100vw, 28vw" />
      </div>
      <AnimatedStat value={6} label="Years of educator experience" color="impact-blush" delay={200} />
    </div>
  </section>
}

function Services() {
  const { ref, visible } = useScrollReveal<HTMLElement>()
  const [activeService, setActiveService] = useState(0)
  return <section ref={ref} className={`section services-section wrap${visible ? ' is-visible' : ''}`} id="services">
    <SectionIntro eyebrow="HOW WE SUPPORT YOU" title="Support for Every Little Step of Parenthood." copy="From pregnancy preparation to breastfeeding and introducing solids, find the guidance and support you need throughout your parenting journey." />
    <div className="services-bento reveal-group">
      {services.map((service, index) => {
        const isActive = activeService === index
        return <article
          className={`service-card ${service.className}${isActive ? ' is-active' : ''}`}
          key={service.title}
          style={{ animationDelay: `${index * 90}ms` }}
          onMouseEnter={() => setActiveService(index)}
        >
          <Image className="service-image" src={service.image} alt={service.imageAlt} fill sizes="(max-width: 760px) 100vw, 55vw" />
          <button
            className="service-card-select"
            type="button"
            aria-label={`Show details for ${service.title}`}
            aria-expanded={isActive}
            aria-controls={`service-detail-${index}`}
            onFocus={() => setActiveService(index)}
            onClick={() => setActiveService(index)}
          >
            <span className="service-index">0{index + 1}</span>
            <span className="service-vertical-title">{service.title}</span>
            <span className="service-toggle-mark" aria-hidden="true">{isActive ? <Minus size={16} /> : <Plus size={16} />}</span>
          </button>
          <div className="service-content" id={`service-detail-${index}`} aria-hidden={!isActive} inert={!isActive}>
            <small>{service.label}</small>
            <strong>{service.title}</strong>
            <span>{service.description}</span>
            <a className="service-explore" href={service.href}>Explore <ArrowRight size={15} /></a>
          </div>
        </article>
      })}
    </div>
  </section>
}

function EducatorSection() {
  return <section className="educator-booking-section" id="about">
    <div className="wrap educator-layout">
      <div className="educator-portrait">
        <Image src="/image.png" alt="A parent speaking with a parenting educator" fill sizes="(max-width: 760px) 100vw, 48vw" />
        <div className="educator-years"><strong>6+</strong><span>years supporting<br />families</span></div>
      </div>
      <div className="educator-copy">
        <Eyebrow>MEET YOUR EDUCATOR</Eyebrow>
        <h2>Thoughtful Guidance. Personal Support.</h2>
        <p>A lactation, infant feeding and childbirth educator with over 6 years of experience supporting mothers and families.</p>
        <div className="educator-specialties">
          <span>Childbirth education</span>
          <span>Lactation support</span>
          <span>Infant feeding</span>
        </div>
        <ul className="educator-credentials" aria-label="Professional qualifications">
          {educatorQualifications.map(({ name, title, detail }) => <li className="educator-credential" key={name}>
            <strong>{name}</strong>
            <div>
              <span>{title}</span>
              {detail && <small>{detail}</small>}
            </div>
          </li>)}
        </ul>
        <div className="educator-booking">
          <a className="button button-dark educator-book-link" id="contact" href={whatsapp('Hello The Little Laughs, I would like to book a 1:1 consultation.')} target="_blank" rel="noreferrer">Book a 1:1 consultation <ArrowUpRight size={15} /></a>
          <span className="educator-book-meta">30-minute Zoom · ₹500 + applicable taxes</span>
        </div>
      </div>
    </div>
  </section>
}

function Programs() {
  const [expandedPrograms, setExpandedPrograms] = useState(() => programs.map(() => true))

  return <section className="section programs-section wrap" id="courses">
    <SectionIntro eyebrow="OUR PROGRAMS" title="Learn, Prepare & Feel More Confident." copy="Practical, evidence-based learning experiences designed to support you through every stage of your parenting journey." />
    <div className="program-grid">
      {programs.map((program, index) => {
        const expanded = expandedPrograms[index]
        const detailsId = `program-details-${index}`
        return <article className={`program-card course-${program.tone}`} id={program.id} key={program.id}>
          <div className="program-photo"><Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className="program-body">
            <span className="program-meta">0{index + 1} / PRE-RECORDED PROGRAM</span>
            <h3>{program.title}</h3>
            <p className="program-audience">{program.audience}</p>
            <div className="program-price">
              <span>Course fee</span>
              <strong>{formatProgramPrice(program.price)}</strong>
              <small>+ {program.taxNote}</small>
            </div>
            <div className={`program-details${expanded ? ' is-expanded' : ''}`} id={detailsId} aria-hidden={!expanded} inert={!expanded}>
              <div className="program-details-inner">
                <h4 className="program-details-heading">What You&apos;ll Learn</h4>
                <p className="program-description">{program.description}</p>
                <div className="program-facts">
                  <div><span>Duration</span><strong>{program.duration}</strong></div>
                  <div><span>Schedule</span><strong>{program.schedule}</strong></div>
                  <div><span>Access</span><strong>{program.access}</strong></div>
                  <div><span>WhatsApp support</span><strong>{program.whatsappSupport}</strong></div>
                  <div className="program-fact-fee"><span>Course fee</span><strong>{formatProgramPrice(program.price)} + {program.taxNote}</strong></div>
                </div>
              </div>
            </div>
            <div className="program-actions">
              <button className="program-toggle" type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpandedPrograms(current => current.map((isExpanded, cardIndex) => cardIndex === index ? !isExpanded : isExpanded))}>
                {expanded ? 'Show less' : 'Show program details'} {expanded ? <Minus size={15} /> : <Plus size={15} />}
              </button>
              <a className="program-enquire" href={whatsapp(program.whatsappMessage)} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                <span>Enquire on WhatsApp</span>
                <ArrowUpRight className="program-enquire-arrow" size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      })}
    </div>
  </section>
}

function TestimonialsSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const videos = [
    { title: 'Pregnancy & birth' },
    { title: 'Feeding support' },
    { title: 'Introducing solids' },
  ]
  const activeVideo = videos[activeVideoIndex]

  return <section className="testimonials-section" aria-labelledby="testimonials-heading">
    <div className="wrap">
      <div className="testimonial-feature-grid">
        <div className="testimonial-heading">
          <Eyebrow>VIDEO TESTIMONIALS</Eyebrow>
          <h2 id="testimonials-heading">Stories from the parenting journey.</h2>
          <p>Watch video stories from the families we support.</p>
          <span className="testimonial-series-label">THE LITTLE LAUGHS <span>·</span> FAMILY STORIES</span>
        </div>
        <article className="testimonial-video-card testimonial-video-feature">
          <div className="testimonial-player-frame">
            <video key={activeVideoIndex} className="testimonial-player" controls playsInline preload="metadata" aria-label={`Video testimonial: ${activeVideo.title}`}>
              <source src="/tesimonial.mp4" type="video/mp4" />
              Your browser does not support embedded videos.
            </video>
          </div>
          <div className="testimonial-video-caption">
            <div>
              <h3>{activeVideo.title}</h3>
              <span>VIDEO STORY · 0{activeVideoIndex + 1}</span>
            </div>
            <div className="testimonial-carousel-controls" aria-label="Testimonial video controls">
              <button type="button" aria-label="Previous testimonial video" onClick={() => setActiveVideoIndex(index => (index + videos.length - 1) % videos.length)}>
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next testimonial video" onClick={() => setActiveVideoIndex(index => (index + 1) % videos.length)}>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
        <div className="testimonial-story-aside">
          <div className="testimonial-quote">
            <Eyebrow>FAMILY STORIES</Eyebrow>
            <p>Hear families share their journeys through pregnancy, feeding and early parenting.</p>
            <span className="testimonial-byline">THE LITTLE LAUGHS <span>·</span> VIDEO STORIES</span>
          </div>
        </div>
      </div>
    </div>
  </section>
}

function ResourcesSection() {
  const resources = [
    ['PREGNANCY', 'Pregnancy preparation'],
    ['BREASTFEEDING', 'Breastfeeding basics'],
    ['BABY FOOD', 'Introducing solid foods'],
    ['EARLY PARENTING', 'Everyday parenting guidance'],
  ]
  return <section className="section resources-section wrap" id="resources">
    <SectionIntro eyebrow="THE JOURNAL" title="Little lessons for your motherhood journey." copy="Have a question about a topic? Get in touch to learn more." />
    <div className="resource-grid">
      {resources.map(([category, title], index) => <a className={`resource resource-${index + 1}`} key={title} href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(title)}`}>
        <span className="resource-number">0{index + 1}</span><span className="resource-category">{category}</span><h3>{title}</h3><span className="resource-link">Ask about this topic <ArrowUpRight size={15} /></span>
      </a>)}
    </div>
  </section>
}

function FAQ() {
  const [active, setActive] = useState<number | null>(0)
  return <section className="section faq-section" id="faq">
    <div className="wrap faq-grid">
      <div className="faq-intro"><Eyebrow>FAQ</Eyebrow><h2>Good Questions, Honest Answers.</h2><p>A little more clarity about courses, consultations and getting support.</p><a className="text-link" href={whatsapp('Hello The Little Laughs, I have a question about your programs.')} target="_blank" rel="noreferrer">Ask us directly <ArrowRight size={16} /></a></div>
      <div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}>
        <h3><button id={`faq-question-${index}`} aria-expanded={active === index} aria-controls={`faq-answer-${index}`} onClick={() => setActive(active === index ? null : index)}>{question}{active === index ? <Minus size={16} /> : <Plus size={16} />}</button></h3>
        <div className={`faq-answer${active === index ? ' is-open' : ''}`} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={active !== index} inert={active !== index}><p>{answer}</p></div>
      </div>)}</div>
    </div>
  </section>
}

function FinalCTA() {
  return <section className="final-cta">
    <div className="wrap final-cta-grid">
      <div>
        <Eyebrow>HERE FOR YOU</Eyebrow>
        <h2>You deserve support, reassurance and a little more confidence.</h2>
        <p>Get the right guidance, practical knowledge and professional support for your parenting journey.</p>
        <div className="final-cta-actions">
          <a className="button button-cream" href="#courses">Explore Our Programs <ArrowRight size={16} /></a>
          <a className="final-whatsapp" href={whatsapp('Hello The Little Laughs, I would like to enquire about support.')} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Talk to us on WhatsApp</a>
        </div>
      </div>
      <div className="final-cta-photo"><Image src="/parent-consultation.png" alt="Mother receiving warm parenting support" fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
    </div>
  </section>
}

export default function HomePage() {
  return <>
    <main>
      <HeroSection />
      <ImpactSection />
      <Services />
      <EducatorSection />
      <Programs />
      <TestimonialsSection />
      <ResourcesSection />
      <FAQ />
      <FinalCTA />
    </main>
    <a className="whatsapp-float" href={whatsapp('Hello The Little Laughs, I would like to know more about your support.')} target="_blank" rel="noreferrer" aria-label="Message The Little Laughs on WhatsApp"><MessageCircle size={21} /></a>
  </>
}
