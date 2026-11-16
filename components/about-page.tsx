'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, Award } from 'lucide-react'
import { createWhatsAppUrl } from '@/lib/whatsapp'

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible')
      return
    }

    node.classList.add('is-pending')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      node.classList.remove('is-pending')
      node.classList.add('is-visible')
      observer.disconnect()
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`about-reveal ${className}`}>{children}</div>
}


export default function AboutPage() {
  return <main className="about-page">
    <section className="about-hero">
      <div className="wrap about-hero-grid">
        <Reveal className="about-hero-copy">
          <span className="eyebrow">ABOUT THE LITTLE LAUGHS</span>
          <h1>Behind Every Confident Parent, There&apos;s the Right Support.</h1>
          <p>The Little Laughs is a space created to support mothers and families with knowledge, guidance and compassionate care through every stage of their parenting journey.</p>
          <div className="about-hero-actions">
            <a className="button button-dark" href="/programs">Explore Our Programs <ArrowRight size={16} /></a>
            <a className="about-text-link" href={createWhatsAppUrl('Hello The Little Laughs, I would like to talk about the support you offer.')} target="_blank" rel="noreferrer">Talk to Us <ArrowUpRight size={15} /></a>
          </div>
          <span className="about-hero-note">Thoughtful support for every little beginning.</span>
        </Reveal>
        <Reveal className="about-hero-portrait">
          <Image src="/image.png" alt="Vashini, educator at The Little Laughs" fill priority loading="eager" sizes="(max-width: 760px) 100vw, 48vw" />
          <span className="about-portrait-caption">VASHINI <span>·</span> EDUCATOR</span>
        </Reveal>
      </div>
    </section>

    <section className="about-section about-educator-section">
      <div className="wrap about-educator-grid">
        <Reveal className="about-educator-portrait">
          <Image src="/image.png" alt="A parenting educator supporting a mother and her baby" fill sizes="(max-width: 760px) 100vw, 42vw" />
          <div className="about-certificate-badge">
            <Award size={18} strokeWidth={1.7} aria-hidden="true" />
            <span>
              <strong>Professional Certificates</strong>
              <small>CAPPA · BEGIN ED INDIA · BPNI</small>
            </span>
          </div>
        </Reveal>
        <Reveal className="about-educator-copy">
          <span className="eyebrow">MEET YOUR EDUCATOR</span>
          <h2>Thoughtful Guidance. Personal Support.</h2>
          <p>A Lactation Consultant, Infant &amp; Young Child Feeding Educator and Childbirth Educator with over 6 years of experience supporting mothers and families.</p>
          <div className="about-profile-card">
            <span className="about-profile-label">YOUR EDUCATOR</span>
            <strong>Vashini</strong>
            <span>Lactation Consultant</span>
            <span>Infant &amp; Young Child Feeding Educator</span>
            <span>Childbirth Educator</span>
          </div>
         
        </Reveal>
      </div>
    </section>

    <section className="about-section about-story-section">
      <div className="wrap about-story-grid">
        <Reveal className="about-story-copy">
          <span className="eyebrow">OUR STORY &amp; PHILOSOPHY</span>
          <h2>One Mother&apos;s Journey Became a Mission to Support Many.</h2>
          <p>The Little Laughs began with Vashini&apos;s own breastfeeding journey and a simple realisation: families deserve clear, compassionate guidance grounded in evidence.</p>
          <p>That personal experience grew into a place for practical support through pregnancy, childbirth, feeding and early parenthood, so parents can feel heard and more confident in the choices that are right for them.</p>
          <blockquote>Parenting doesn&apos;t need more pressure or guilt. It needs the right information, support and someone who understands the realities of parenthood.</blockquote>
          <p className="about-story-goal">To empower parents with knowledge and make their parenting journey more informed, confident and joyful.</p>
        </Reveal>
        <Reveal className="about-story-photo">
          <Image src="/introducing-solids.png" alt="A parent sharing a calm feeding moment with their baby" fill sizes="(max-width: 760px) 100vw, 42vw" />
        </Reveal>
      </div>
    </section>

    <section className="about-final-cta">
      <div className="wrap about-final-cta-grid">
        <div>
          <span className="eyebrow">HERE FOR YOU</span>
          <h2>Your Parenting Journey Deserves the Right Support.</h2>
          <p>Explore our programs or connect with us for personalised guidance.</p>
          <div className="about-final-actions">
            <a className="button button-cream" href="/programs">Explore Our Programs <ArrowRight size={16} /></a>
            <a className="about-final-link" href="/#contact">Book a Consultation <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="about-final-photo">
          <Image src="/mother-newborn.png" alt="A mother holding her newborn close" fill sizes="(max-width: 760px) 100vw, 44vw" />
        </div>
      </div>
    </section>
  </main>
}
