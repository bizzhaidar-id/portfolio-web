import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Download } from 'lucide-react'
import Reveal from '../components/Reveal'
import ArticleCard from '../components/ArticleCard'
import CaseStudyCard from '../components/CaseStudyCard'
import CtaBand from '../components/CtaBand'
import { usePageTitle } from '../lib/site'
import { articles } from '../lib/articles'
import { caseStudies } from '../lib/caseStudies'

export default function HomePage() {
  const { t, i18n } = useTranslation()
  usePageTitle()
  const featured = caseStudies.list(i18n.language).slice(0, 2)
  const latest = articles.list(i18n.language).slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/70 via-transparent to-transparent dark:from-brand-900/30" />
        <motion.div
          className="mx-auto max-w-5xl px-4 pb-12 pt-20 sm:px-6 sm:pt-28"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t('home.eyebrow')}
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            {t('home.title')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t('home.intro')}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {t('home.impact').map((s) => (
              <div key={s.label} className="card p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold tabular-nums text-brand-600 dark:text-brand-400">{s.value}</span>
                  <span className="mt-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{s.label}</span>
                  <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{s.source}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              {t('home.ctaCases')} <ArrowRight size={18} />
            </Link>
            <a
              href="/resume.pdf"
              download="Ibnu-Haidar-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <Download size={18} /> {t('home.ctaCv')}
            </a>
          </div>
        </motion.div>
      </section>

      <section className="section">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.featuredTitle')}</h2>
          <Link to="/portfolio" className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            {t('home.viewAllCases')} →
          </Link>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <CaseStudyCard study={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <Reveal>
          <Link
            to="/tools"
            className="card group flex flex-col gap-4 transition hover:-translate-y-1 hover:shadow-md sm:flex-row sm:items-center"
          >
            <span className="flex-1">
              <span className="block text-xl font-bold text-slate-900 dark:text-white">{t('home.toolsTitle')}</span>
              <span className="mt-1 block text-sm">{t('home.toolsDesc')}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 dark:text-brand-400">
              {t('home.toolsCta')} <ArrowRight size={16} />
            </span>
          </Link>
        </Reveal>
      </section>

      {latest.length > 0 && (
        <section className="section pt-0">
          <Reveal className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.latestTitle')}</h2>
            <Link to="/articles" className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
              {t('home.viewAll')} →
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </section>
      )}

      <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />
    </>
  )
}
