'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Play, Search, X } from 'lucide-react'
import { featuredJournalArticle, journalArticles, journalCategories, publishedJournalArticles } from '@/data/journal'

const storyVideos = [
  {
    id: 'story-1',
    title: 'A calm feeding rhythm',
    description: 'A parent shares how support and routine made feeding feel more manageable.',
    name: 'Aanya',
    video: '/tesimonial.mp4',
    image: '/placeholder-user.jpg',
  },
  {
    id: 'story-2',
    title: 'Feeling more confident',
    description: 'New parents talk about learning practical guidance and building confidence early.',
    name: 'Rhea',
    video: '/tesimonial.mp4',
    image: '/placeholder-user.jpg',
  },
  {
    id: 'story-3',
    title: 'Support that felt personal',
    description: 'A mother shares how compassionate guidance helped her through early parenting.',
    name: 'Meera',
    video: '/tesimonial.mp4',
    image: '/placeholder-user.jpg',
  },
]

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | string>('All')
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)
  const [activeVideo, setActiveVideo] = useState<typeof storyVideos[number] | null>(null)

  useEffect(() => {
    if (!activeVideo) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeVideo])

  const filteredArticles = useMemo(() => {
    return publishedJournalArticles.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
      const text = `${article.title} ${article.excerpt}`.toLowerCase()
      const matchesSearch = text.includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  const latestArticles = filteredArticles.slice(0, visibleCount)

  const articleCountLabel = `${filteredArticles.length} article${filteredArticles.length === 1 ? '' : 's'}`

  return (
    <main className="page-shell">
      <section className="journal-hero section-shell">
        <div className="wrap journal-hero-grid">
          <div>
            <span className="eyebrow">THE LITTLE LAUGHS JOURNAL</span>
            <h1>Little Lessons for Your Motherhood Journey.</h1>
            <p>
              Thoughtful reads, practical guidance and evidence-based information to support you
              through pregnancy, breastfeeding, introducing solids and everyday parenting.
            </p>
          </div>
          <div className="journal-hero-media">
            <Image src="/mother-newborn.png" alt="Parent enjoying a quiet moment with a newborn" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="wrap">
          <div className="journal-featured">
            <div className="journal-featured-media">
              <Image src={featuredJournalArticle?.featuredImage ?? '/mother-newborn.png'} alt={featuredJournalArticle?.imageAlt ?? 'Featured article'} fill sizes="(max-width: 768px) 100vw, 58vw" />
            </div>
            <div className="journal-featured-copy">
              <span className="eyebrow">FEATURED READ</span>
              <span className="journal-category-tag">{featuredJournalArticle?.category}</span>
              <h2>{featuredJournalArticle?.title ?? 'Featured article coming soon'}</h2>
              <p>
                {featuredJournalArticle?.excerpt ?? 'This editorial feature will be published once approved content is ready.'}
              </p>
              <div className="journal-meta-row">
                <span>{featuredJournalArticle?.readingTime ?? 'Pending'}</span>
                <span>{featuredJournalArticle?.author ?? 'Editorial draft'}</span>
              </div>
              {featuredJournalArticle ? (
                <Link className="button button-dark" href={`/resources/${featuredJournalArticle.slug}`}>
                  Read Article <ArrowRight size={15} />
                </Link>
              ) : (
                <span className="journal-status">Unpublished editorial placeholder</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell journal-topics-shell">
        <div className="wrap">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">EXPLORE TOPICS</span>
              <h2>Explore Topics That Matter to You.</h2>
            </div>
          </div>
          <div className="journal-topic-grid">
            {journalCategories.map((category, index) => {
              const cardImage = ['pregnancy-support','mother-newborn','introducing-solids','parent-consultation'][index]
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  className={`journal-topic-card ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(isActive ? 'All' : category)}
                >
                  <div className="journal-topic-image">
                    <Image src={`/${cardImage}.png`} alt={category} fill sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                  <div className="journal-topic-copy">
                    <span>{category}</span>
                    <p>
                      {category === 'Pregnancy' && 'Support for planning, preparation and confident early milestones.'}
                      {category === 'Breastfeeding' && 'Helpful information around feeding routines, comfort and confidence.'}
                      {category === 'Introducing Solids' && 'Thoughtful ways to begin the food journey with patience and ease.'}
                      {category === 'Early Parenting' && 'Practical guidance for everyday routines, rest and connection.'}
                    </p>
                    <strong>View Articles <ArrowRight size={15} /></strong>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="wrap">
          <div className="section-heading-row section-heading-row-spread">
            <div>
              <span className="eyebrow">FROM THE JOURNAL</span>
              <h2>Helpful Reads for Every Little Step.</h2>
            </div>
            <div className="journal-search-wrap">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setVisibleCount(6)
                }}
                placeholder="Search articles"
                aria-label="Search articles"
              />
              {search && (
                <button type="button" aria-label="Clear search" onClick={() => setSearch('')}>
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="journal-filter-row">
            <button type="button" className={selectedCategory === 'All' ? 'is-active' : ''} onClick={() => setSelectedCategory('All')}>
              All Articles
            </button>
            {journalCategories.map((category) => (
              <button key={category} type="button" className={selectedCategory === category ? 'is-active' : ''} onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            ))}
          </div>

          <div className="journal-grid" aria-live="polite">
            {latestArticles.length > 0 ? (
              latestArticles.map((article) => (
                <article key={article.id} className="journal-card">
                  <div className="journal-card-image">
                    <Image src={article.featuredImage} alt={article.imageAlt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <div className="journal-card-copy">
                    <span className="journal-card-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="journal-card-meta">
                      {article.publishedDate && <span>{article.publishedDate}</span>}
                      {article.readingTime && <span>{article.readingTime}</span>}
                    </div>
                    <Link href={`/resources/${article.slug}`}>
                      Read More <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="journal-empty-state">
                <p>No articles match your search yet. Try another keyword or reset the filter.</p>
                <button type="button" className="button button-dark" onClick={() => { setSearch(''); setSelectedCategory('All'); }}>
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {filteredArticles.length > latestArticles.length && (
            <div className="journal-load-more-wrap">
              <button type="button" className="button button-cream" onClick={() => setVisibleCount((count) => count + 3)}>
                Load More
              </button>
            </div>
          )}

          <div className="journal-results-meta">{articleCountLabel}</div>
        </div>
      </section>

      <section className="section-shell journal-stories-shell">
        <div className="wrap">
          <div className="section-heading-row journal-stories-heading">
            <div>
              <span className="eyebrow">PARENT STORIES</span>
              <h2>Real Experiences. Shared With Love.</h2>
            </div>
            <p>
              Every parenting journey is different. Discover the experiences of parents who have found guidance and support through The Little Laughs.
            </p>
          </div>
          <div className="journal-story-grid">
            {storyVideos.map((story) => (
              <button key={story.id} type="button" className="journal-story-card" onClick={() => setActiveVideo(story)}>
                <div className="journal-story-thumbnail">
                  <Image src={story.image} alt={story.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="journal-play-button"><Play size={16} fill="currentColor" /></span>
                </div>
                <div className="journal-story-copy">
                  <strong>{story.title}</strong>
                  <p>{story.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell journal-cta-shell">
        <div className="wrap journal-cta-box">
          <div>
            <h2>A Little More Knowledge. A Little More Confidence.</h2>
            <p>Explore helpful guidance and practical information for your motherhood and parenting journey.</p>
          </div>
          <Link className="button button-dark" href="/programs">
            Explore Our Programs <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {activeVideo && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)} role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <div className="video-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="video-close" aria-label="Close video" onClick={() => setActiveVideo(null)}>
              <X size={16} />
            </button>
            <video key={activeVideo.id} className="video-player" controls autoPlay playsInline poster={activeVideo.image}>
              <source src={activeVideo.video} type="video/mp4" />
            </video>
            <div className="video-modal-copy">
              <strong>{activeVideo.name}</strong>
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
