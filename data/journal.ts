export type JournalCategory = 'Pregnancy' | 'Breastfeeding' | 'Introducing Solids' | 'Early Parenting'

export type JournalContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string }

export type JournalArticle = {
  id: string
  slug: string
  title: string
  category: JournalCategory
  excerpt: string
  featuredImage: string
  imageAlt: string
  author: string
  publishedDate: string | null
  readingTime: string
  content: JournalContentBlock[]
  isFeatured: boolean
  isPublished: boolean
}

export const journalCategories: JournalCategory[] = ['Pregnancy', 'Breastfeeding', 'Introducing Solids', 'Early Parenting']

export const journalArticles: JournalArticle[] = [
  {
    id: 'feeding-journey',
    slug: 'understanding-your-babys-feeding-journey',
    title: "Understanding Your Baby's Feeding Journey",
    category: 'Breastfeeding',
    excerpt: 'Explore helpful information and practical guidance as you navigate your baby\'s feeding journey.',
    featuredImage: '/mother-newborn.png',
    imageAlt: 'Mother and baby resting together while breastfeeding',
    author: 'The Little Laughs Editorial Team',
    publishedDate: null,
    readingTime: '6 min read',
    isFeatured: true,
    isPublished: true,
    content: [
      { type: 'heading', text: 'A feeding journey is personal and ever-changing' },
      { type: 'paragraph', text: 'Every baby feeds differently, and feeding journeys can change from day to day. What matters most is noticing patterns, responding with patience and seeking support when something feels uncertain.' },
      { type: 'paragraph', text: 'During the early weeks, feeding may feel unpredictable. Some days are easy, while others bring exhaustion, discomfort or questions about milk supply and baby cues. These experiences are common, and they do not mean you are doing anything wrong.' },
      { type: 'heading', text: 'Start with connection over perfection' },
      { type: 'paragraph', text: 'A strong feeding relationship often starts with calm routines, skin-to-skin time and gentle observation. Watch your baby for early hunger cues, pace yourself and avoid rushing the process. Supportive routines help both of you feel more settled.' },
      { type: 'list', items: ['Offer calm, quiet feeding moments', 'Notice your baby\'s hunger and fullness cues', 'Keep a flexible routine rather than chasing a perfect schedule', 'Talk to a professional if you feel uncertain or overwhelmed'] },
      { type: 'image', src: '/parent-consultation.png', alt: 'Parent and baby in a calm feeding moment' },
      { type: 'heading', text: 'When to ask for support' },
      { type: 'paragraph', text: 'It is perfectly okay to seek support from a lactation professional or a trusted healthcare provider. If you have concerns about your baby\'s feeding, your own comfort or your confidence, reaching out early can help you feel more informed and supported.' },
    ],
  },
  {
    id: 'pregnancy-prep',
    slug: 'a-gentle-start-to-pregnancy-preparation',
    title: 'A Gentle Start to Pregnancy Preparation',
    category: 'Pregnancy',
    excerpt: 'Practical ways to begin your pregnancy journey with calm routines, informed choices and confidence.',
    featuredImage: '/pregnancy-support.png',
    imageAlt: 'Expectant mother preparing for childbirth with calm support',
    author: 'The Little Laughs Editorial Team',
    publishedDate: null,
    readingTime: '4 min read',
    isFeatured: false,
    isPublished: true,
    content: [
      { type: 'heading', text: 'Prepare in a way that feels supportive' },
      { type: 'paragraph', text: 'Pregnancy preparation can feel full of information, questions and important decisions. You do not need to do everything at once. A gentle, informed approach often feels most sustainable.' },
      { type: 'paragraph', text: 'Start with the basics: understanding your pregnancy timeline, discussing your birth preferences and making space for rest, nourishment and practical support. It can be helpful to keep information simple and relevant to your own needs.' },
      { type: 'heading', text: 'Create a supportive rhythm' },
      { type: 'paragraph', text: 'A well-supported pregnancy often includes rest, regular meals, movement that feels comfortable and time to connect with your care team. You might also find it useful to prepare a simple list of questions for appointments and create a support plan for the weeks ahead.' },
      { type: 'list', items: ['Ask what support feels helpful to you', 'Focus on rest and nourishment', 'Keep your information sources trusted and relevant', 'Give yourself permission to learn gradually'] },
      { type: 'image', src: '/image.png', alt: 'Pregnancy educator providing thoughtful guidance' },
    ],
  },
  {
    id: 'first-weeks-breastfeeding',
    slug: 'breastfeeding-through-the-early-weeks',
    title: 'Breastfeeding Through the Early Weeks',
    category: 'Breastfeeding',
    excerpt: 'Gentle support, realistic expectations and practical ways to build confidence in the early weeks.',
    featuredImage: '/mother-newborn.png',
    imageAlt: 'Parent and newborn sharing a quiet feeding moment',
    author: 'The Little Laughs Editorial Team',
    publishedDate: null,
    readingTime: '5 min read',
    isFeatured: false,
    isPublished: true,
    content: [
      { type: 'heading', text: 'The early weeks are a learning phase' },
      { type: 'paragraph', text: 'Breastfeeding can feel both instinctive and unfamiliar in the early weeks. Newborns feed often, sleep unpredictably and may still be learning how to latch or settle. That does not mean your breastfeeding journey is off track.' },
      { type: 'paragraph', text: 'Many parents benefit from a supportive environment, helpful positioning cues and gentle encouragement. Small changes in positioning, feeding rhythm and rest can make a meaningful difference.' },
      { type: 'list', items: ['Try upright or side-lying positions if they feel more comfortable', 'Create a quiet feeding space when possible', 'Ask for help before stress builds up', 'Watch for comfort, not perfection'] },
      { type: 'heading', text: 'Support that truly helps' },
      { type: 'paragraph', text: 'Your care team, a lactation professional or a trusted parent support group can offer practical guidance. Sometimes a short conversation is enough to help you feel more steady and confident in your routine.' },
    ],
  },
  {
    id: 'solids-draft',
    slug: 'starting-solids-with-calm-confidence',
    title: 'Starting Solids with Calm Confidence',
    category: 'Introducing Solids',
    excerpt: 'An editorial draft exploring how families can approach introducing solids with patience and curiosity.',
    featuredImage: '/introducing-solids.png',
    imageAlt: 'Parent introducing a spoonful of food to baby',
    author: 'The Little Laughs Editorial Team',
    publishedDate: null,
    readingTime: '7 min read',
    isFeatured: false,
    isPublished: false,
    content: [
      { type: 'heading', text: 'Draft article placeholder' },
      { type: 'paragraph', text: 'This article is currently in draft status and is intentionally not published publicly until approved for sharing.' },
    ],
  },
  {
    id: 'early-parenting',
    slug: 'creating-a-supportive-routine-for-new-parents',
    title: 'Creating a Supportive Routine for New Parents',
    category: 'Early Parenting',
    excerpt: 'A gentle look at building realistic rhythms, rest and practical support for early parenting.',
    featuredImage: '/parent-consultation.png',
    imageAlt: 'New parents building a gentle routine together',
    author: 'The Little Laughs Editorial Team',
    publishedDate: null,
    readingTime: '6 min read',
    isFeatured: false,
    isPublished: false,
    content: [
      { type: 'heading', text: 'Draft article placeholder' },
      { type: 'paragraph', text: 'This article is being developed as an approved resource and remains unpublished until reviewed and approved.' },
    ],
  },
]

export const featuredJournalArticle = journalArticles.find((article) => article.isPublished && article.isFeatured) ?? journalArticles.find((article) => article.isPublished) ?? null

export const publishedJournalArticles = journalArticles.filter((article) => article.isPublished)
