export type Program = {
  id: string
  slug: string
  title: string
  subtitle: string
  audience: string
  description: string
  price: number
  taxNote: string
  duration: string
  schedule: string
  access: string
  whatsappSupport: string
  image: string
  imageAlt: string
  tone: 'sage' | 'blush'
  learningOutcomes: string[]
  whatsappMessage: string
  isActive: boolean
  isFeatured: boolean
}

export const programs: Program[] = [
  {
    id: 'program-breastfeeding',
    slug: 'breastfeeding-made-simple',
    title: 'Breastfeeding Made Simple',
    subtitle: '',
    audience: 'For Pregnant & Lactating Mothers',
    description: 'A practical and comprehensive session designed to help mothers understand breastfeeding, build confidence and navigate common feeding challenges with the right knowledge and support.',
    price: 1050,
    taxNote: 'applicable taxes',
    duration: '2.5 hours',
    schedule: 'Pre-recorded',
    access: '10 days',
    whatsappSupport: '3 days',
    image: '/mother-newborn.png',
    imageAlt: 'A mother holding her newborn close',
    tone: 'sage',
    learningOutcomes: [
      'How breastfeeding works.',
      'Understanding milk supply and whether your baby is getting enough milk.',
      'Comfortable breastfeeding positions.',
      'Latching techniques.',
      "How to track your baby's growth.",
      'Managing growth spurts, sleep regression and cluster feeding.',
      'Ways to support and increase breastmilk supply and reduce formula intake.',
      'Basics of pumping.',
      'And much more.',
    ],
    whatsappMessage: 'Hello The Little Laughs, I would like to know more about Breastfeeding Made Simple.',
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'program-solids',
    slug: 'introducing-solids',
    title: 'Introducing Solids',
    subtitle: '',
    audience: 'A Complete Guide for Parents Starting Solids — 6–12 Months',
    description: 'A comprehensive session to help parents confidently navigate the transition to solids while building healthy and positive feeding habits from the very beginning.',
    price: 1200,
    taxNote: 'applicable taxes',
    duration: '2.5 hours',
    schedule: 'Pre-recorded',
    access: '10 days',
    whatsappSupport: '3 days',
    image: '/introducing-solids.png',
    imageAlt: 'A parent offering age-appropriate food to a baby',
    tone: 'blush',
    learningOutcomes: [
      'How to know if your baby is ready for solids.',
      'Traditional and responsive feeding approaches.',
      'Baby-led weaning.',
      'What foods to offer and how to offer them.',
      'Understanding the difference between gagging and choking and how to respond.',
      'The disadvantages of distraction and force feeding.',
      'And much more.',
    ],
    whatsappMessage: 'Hello The Little Laughs, I would like to know more about the Introducing Solids program.',
    isActive: true,
    isFeatured: false,
  },
]

export const activePrograms = programs.filter(program => program.isActive)

export function formatProgramPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`
}
