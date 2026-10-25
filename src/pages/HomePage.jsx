import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Briefcase, Calculator, Newspaper } from 'lucide-react'
import Reveal from '../components/Reveal'
import ArticleCard from '../components/ArticleCard'
import CtaBand from '../components/CtaBand'
import { usePageTitle } from '../lib/site'
import { getArticles } from '../lib/content'

const EXPLORE = [
  { key: 'portfolio', to: '/portfolio', icon: Briefcase },
  { key: 'articles', to: '/articles', icon: Newspaper },
  { key: 'tools', to: '/tools', icon: Calculator },
]

export default function HomePage() {
  const { t, i18n } = useTranslation()
  usePageTitle()

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/70 via-transparent to-transparent dark:from-brand-900/30" />
        <motion.div
          className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t('home.eyebrow')}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            {t('home.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t('home.intro')}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              {t('home.ctaArticles')} <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {t('home.ctaAbout')}
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {t('about.stats').map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.value}</span>
              <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <h2 className="section-title">{t('home.exploreTitle')}</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {EXPLORE.map(({ key, to, icon: Icon }, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <Link to={to} className="card group flex h-full items-start gap-4 transition hover:-translate-y-1 hover:shadow-md">
                <span className="rounded-xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <Icon size={22} />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 text-lg font-semibold text-slate-900 dark:text-white">
                    {t(`home.explore.${key}.title`)}
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block text-sm">{t(`home.explore.${key}.desc`)}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.latestTitle')}</h2>
          <Link to="/articles" className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            {t('home.viewAll')} →
          </Link>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getArticles(i18n.language).slice(0, 3).map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </section>

      <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />
    </>
  )
}
