import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import { journalArticles, publishedJournalArticles } from '@/data/journal'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = journalArticles.find((entry) => entry.slug === slug && entry.isPublished)

  if (!article) {
    return {
      title: 'Journal Article | The Little Laughs',
    }
  }

  return {
    title: `${article.title} | The Little Laughs Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.featuredImage }],
    },
  }
}

export default async function ResourceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = publishedJournalArticles.find((entry) => entry.slug === slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = publishedJournalArticles.filter((entry) => entry.slug !== article.slug).slice(0, 3)
  const articleUrl = `https://thelittlelaughs.com/resources/${article.slug}`

  return (
    <main className="article-page-shell">
      <section className="article-hero section-shell">
        <div className="wrap article-hero-grid">
          <div className="article-hero-copy">
            <Link href="/resources" className="article-back-link"><ArrowLeft size={15} /> Back to Journal</Link>
            <span className="eyebrow">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="article-meta-row">
              <span>{article.author}</span>
              {article.publishedDate && <span>{article.publishedDate}</span>}
              <span>{article.readingTime}</span>
            </div>
          </div>
          <div className="article-hero-image">
            <Image src={article.featuredImage} alt={article.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section-shell article-content-shell">
        <div className="wrap article-layout">
          <article className="article-body">
            <p className="article-intro">{article.excerpt}</p>
            {article.content.map((block, index) => {
              if (block.type === 'heading') {
                return <h2 key={`${block.text}-${index}`} className="article-section-heading">{block.text}</h2>
              }
              if (block.type === 'paragraph') {
                return <p key={`${block.text}-${index}`} className="article-paragraph">{block.text}</p>
              }
              if (block.type === 'list') {
                return <ul key={`list-${index}`} className="article-list">
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              }
              return <div key={`image-${index}`} className="article-inline-image"><Image src={block.src} alt={block.alt} fill sizes="(max-width: 768px) 100vw, 80vw" /></div>
            })}
          </article>

          <aside className="article-sidebar">
            <div className="article-share-box">
              <span className="eyebrow">SHARE</span>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${articleUrl}`)}`} target="_blank" rel="noreferrer">
                <Share2 size={15} /> Share on WhatsApp
              </a>
              <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${article.title} - ${articleUrl}`)}`}>
                <ArrowRight size={15} /> Share by email
              </a>
            </div>

            <div className="article-related-box">
              <span className="eyebrow">RELATED READS</span>
              {relatedArticles.map((related) => (
                <Link href={`/resources/${related.slug}`} key={related.id} className="article-related-item">
                  <span>{related.category}</span>
                  <strong>{related.title}</strong>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
