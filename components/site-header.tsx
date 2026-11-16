'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Menu, Smile, X } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Journal', href: '/resources' },
  { label: 'Contact', href: '/contact' },
]

const announcementPhrases = ['Pregnancy & childbirth', 'Feeding & early parenting', 'For every little beginning']

function AnnouncementBanner() {
  return <section className="announcement-banner" aria-label="Announcement">
    <p>Thoughtful guidance for pregnancy, feeding and early parenting, for every little beginning.</p>
    <div className="announcement-ribbon" aria-hidden="true">
      <div className="announcement-ribbon-track">
        {Array.from({ length: 6 }, (_, index) => announcementPhrases.map((phrase, phraseIndex) => <span className="announcement-message" key={`${index}-${phraseIndex}`}>
          {phrase}<Smile size={18} strokeWidth={1.8} />
        </span>))}
      </div>
    </div>
  </section>
}

export default function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/resources') return pathname === '/resources' || pathname.startsWith('/resources/')
    if (href === '/contact') return pathname === '/contact'
    return pathname === href
  }
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeader = () => setScrolled(current => isHome && (current ? window.scrollY > 24 : window.scrollY > 56))
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [isHome])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !mobileMenuRef.current) return
      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      menuButtonRef.current?.focus()
    }
  }, [open])

  const headerClassName = [
    'site-header',
    isHome ? 'is-home-overlay' : 'is-inner-page',
    scrolled ? 'is-scrolled' : '',
    open ? 'menu-is-open' : '',
  ].filter(Boolean).join(' ')

  return <>
    <AnnouncementBanner />
    <header className={headerClassName}>
      <div className="site-header-inner">
        <a className="header-brand" href="/" aria-label="The Little Laughs home">
          <Image className="header-logo" src="/logo.jpeg" alt="" width={68} height={68} priority />
          <span className="header-brand-name">The Little Laughs</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ label, href }) => <a key={label} href={href} aria-current={isActiveLink(href) ? 'page' : undefined}>{label}</a>)}
        </nav>
        <a className="button button-dark header-book" href="/contact" aria-label="Book a Consultation">
          <span className="header-book-full">Book a Consultation</span>
          <span className="header-book-short">Book</span>
          <ArrowUpRight size={15} />
        </a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
    <div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu" aria-hidden={!open} inert={!open}>
      <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" tabIndex={-1} onClick={() => setOpen(false)} />
      <div ref={mobileMenuRef} className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Main navigation">
        <div className="mobile-menu-header">
          <span>Menu</span>
          <button ref={closeButtonRef} className="mobile-menu-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map(({ label, href }) => <a key={label} href={href} aria-current={isActiveLink(href) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}<ArrowRight size={16} /></a>)}
        </nav>
        <a className="button button-dark mobile-book" href="/contact" onClick={() => setOpen(false)}>Book a Consultation <ArrowUpRight size={16} /></a>
      </div>
    </div>
  </>
}
