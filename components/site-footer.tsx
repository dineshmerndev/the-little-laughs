import { ArrowDownRight } from 'lucide-react'
import { siteContact } from '@/config/site'

export default function SiteFooter() {
  return <footer className="footer">
    <div className="wrap footer-main">
      <div className="footer-brand">
        <a className="wordmark" href="/">the little laughs</a>
        <p>Supporting mothers and families with evidence-based knowledge, practical guidance and compassionate care through every stage of the parenting journey.</p>
        <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
        <a href={`mailto:${siteContact.secondaryEmail}`}>{siteContact.secondaryEmail}</a>
      </div>
      <div className="footer-column">
        <h2>EXPLORE</h2>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/programs">Programs</a>
        <a href="/resources">Journal</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="footer-column">
        <h2>PROGRAMS</h2>
        <a href="/#program-breastfeeding">Breastfeeding Made Simple</a>
        <a href="/#program-solids">Introducing Solids</a>
        <a href="/#contact">1:1 Consultation</a>
      </div>
      <div className="footer-column footer-contact">
        <h2>CONTACT</h2>
        <a href={`tel:${siteContact.phone}`}>{siteContact.displayPhone}</a>
        <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
        <a href={`mailto:${siteContact.secondaryEmail}`}>{siteContact.secondaryEmail}</a>
      </div>
    </div>
    <div className="wrap footer-lower">
      <div className="oversized-mark" aria-label="The Little Laughs">the little laughs</div>
      <div className="footer-meta">
        <div className="footer-policies">
          <a href="/refund-policy">Cancellation & Refund Policy</a>
          <a href={`mailto:${siteContact.email}?subject=${encodeURIComponent('Privacy Policy')}`}>Privacy Policy</a>
          <a href={`mailto:${siteContact.email}?subject=${encodeURIComponent('Terms & Conditions')}`}>Terms & Conditions</a>
        </div>
        <span>© {new Date().getFullYear()} The Little Laughs. All rights reserved.</span>
        <a href="/">Back to home <ArrowDownRight size={14} /></a>
      </div>
    </div>
  </footer>
}
