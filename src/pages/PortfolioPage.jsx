import { lazy, Suspense, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Presentation } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import Modal from '../components/Modal'
import { getCaseStudies } from '../lib/content'

const PdfSlides = lazy(() => import('../components/PdfSlides'))

const FILTERS = ['all', 'improvement', 'operations', 'research', 'learning']

export default function PortfolioPage() {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const items = getCaseStudies(i18n.language).filter((p) => filter === 'all' || p.category === filter)

  return (
    <>
      <PageHeader title={t('portfolio.title')} subtitle={t('portfolio.subtitle')} />
      <section className="section">
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? 'bg-brand-600 text-white dark:bg-brand-500'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f === 'all' ? t('portfolio.all') : t(`portfolio.categories.${f}`)}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                key={p.slug}
                layout
                className="card flex flex-col"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {t(`portfolio.categories.${p.category}`)}
                    </span>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                      <Link to={`/portfolio/${p.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{p.context}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="block text-2xl font-extrabold text-brand-600 dark:text-brand-400">{p.metric}</span>
                    <span className="block max-w-[9rem] text-xs text-slate-500 dark:text-slate-400">{p.metricLabel}</span>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed">{p.summary}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-2">
                    {p.tags?.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {p.file && (
                    <button
                      onClick={() => setActive(p)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
                    >
                      <Presentation size={16} /> {t('portfolio.viewDetails')}
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Modal open={!!active} onClose={close} title={active?.title} closeLabel={t('portfolio.close')} className="max-w-5xl">
        {active && (
          <>
            <div className="mb-4 pr-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {t(`portfolio.categories.${active.category}`)} · {active.context}
              </span>
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">{active.title}</h2>
            </div>
            <Suspense fallback={<div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-950" />}>
              <PdfSlides file={active.file} />
            </Suspense>
          </>
        )}
      </Modal>

      <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />
    </>
  )
}
