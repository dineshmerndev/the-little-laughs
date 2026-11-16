import { siteContact } from '@/config/site'

export const metadata = { title: 'Cancellation & Refund Policy | The Little Laughs', description: 'Cancellation and refund policy for The Little Laughs courses and consultations.' }

export default function RefundPolicyPage() {
  return <main className="policy-page">
    <section className="policy-hero"><div className="wrap"><span className="eyebrow">THE LITTLE LAUGHS · INFORMATION</span><h1>Cancellation & Refund Policy</h1><p>Clear information for your peace of mind.</p></div></section>
    <article className="wrap policy-content">
      <p>At The Little Laughs, we strive to provide high quality educational sessions and personalised support. Please read our cancellation and refund policy before making a purchase.</p>
      <h2>Online Courses</h2>
      <p>Our online courses are pre-recorded digital sessions and access is provided after payment. Therefore, course fees are non-refundable once access to the course has been provided.</p>
      <p>If you have purchased a course but have not yet received access, please contact us at <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> to discuss your request.</p>
      <h2>1:1 Consultations</h2>
      <p>For individual consultations, cancellations or rescheduling requests must be made at least 24 hours before the scheduled appointment.</p>
      <p>Requests made more than 24 hours in advance may be eligible for rescheduling or a refund, as applicable.</p>
      <p>Cancellations made less than 24 hours before the appointment, or failure to attend the scheduled consultation, will not be eligible for a refund.</p>
      <h2>Technical Issues</h2>
      <p>If you experience any genuine technical issue that prevents you from accessing a purchased course or attending a scheduled consultation, please contact us at <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> or WhatsApp us at <a href={`https://wa.me/${siteContact.whatsappNumber}`}>{siteContact.displayPhone}</a>. We will make reasonable efforts to resolve the issue or provide an appropriate alternative.</p>
      <h2>Refund Processing</h2>
      <p>Where a refund is approved, it will be processed through the original payment method. Processing times may vary depending on the payment provider or bank.</p>
      <p>For any questions regarding cancellations or refunds, please contact us before making a purchase.</p>
      <a className="button button-dark" href="/">Return to homepage</a>
    </article>
  </main>
}
