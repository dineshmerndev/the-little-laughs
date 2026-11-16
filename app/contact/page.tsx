import type { Metadata } from 'next'
import ContactPage from '@/components/contact-page'

export const metadata: Metadata = {
  title: 'Contact | The Little Laughs',
  description: 'Get in touch with The Little Laughs for support, questions and personalised guidance.',
}

export default function Page() {
  return <ContactPage />
}
