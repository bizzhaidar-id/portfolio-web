import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Award, FlaskConical } from 'lucide-react'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import KpiCompare from '../components/KpiCompare'
import { usePageTitle } from '../lib/site'
import { caseStudies } from '../lib/caseStudies'

const ArticleBody = lazy(() => import('../components/ArticleBody'))

export default function CaseStudyPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const study = caseStudies.get(slug, i18n.language)
  usePageTitle(study?.title ?? t('portfolio.notFound'))

  if (!study) {
    return (
      <section className="section">
        <p>{t('portfolio.notFound')}</p>
        <Link to="/portfolio" className="mt-4 inline-block font-semibold text-brand-600 dark:text-brand-400">
          {t('portfolio.back')}
        </Link>
      </section>
    )
  }

  const meta = [
    ['role', study.role],
    ['period', study.period],
    ['method', study.method],
  ].filter(([, v]) => v)

  return (
    <>
      <div className="border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-transparent dark:border-slate-800 dark:from-brand-900/20">
        <Reveal className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            <ArrowLeft size={16} /> {t('portfolio.back')}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-300">
            {t(`portfolio.categories.${study.category}`)}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{study.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-400">{study.summary}</p>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
              {meta.map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{t(`portfolio.meta.${key}`)}</dt>
                  <dd className="mt-0.5 font-medium text-slate-900 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
            {study.metric && (
              <div className="shrink-0 sm:text-right">
                <span className="block text-4xl font-extrabold tabular-nums text-brand-600 dark:text-brand-400">{study.metric}</span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">{study.metricLabel}</span>
              </div>
            )}
          </div>
          {study.award && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta-100 px-3 py-1 text-sm font-semibold text-terracotta-800 dark:bg-terracotta-900/50 dark:text-terracotta-200">
              <Award size={16} /> {study.award}
            </p>
          )}
        </Reveal>
      </div>

      {study.kpis?.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
          <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{t('portfolio.compareTitle')}</h2>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{t('portfolio.compareNote')}</p>
          <KpiCompare kpis={study.kpis} />
        </section>
      )}

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Suspense fallback={<div className="h-60" />}>
          <ArticleBody>{study.body}</ArticleBody>
        </Suspense>

        {study.images?.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-[1fr_2fr]">
            {study.images.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800">
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-contain" />
              </figure>
            ))}
          </div>
        )}

        {study.tool && (
          <Link
            to={`/tools/${study.tool}`}
            className="card group mt-10 flex items-center gap-4 transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="rounded-xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              <FlaskConical size={22} />
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-slate-900 dark:text-white">{t('portfolio.tryTool')}</span>
              <span className="block text-sm">{t('portfolio.tryToolDesc')}</span>
            </span>
            <ArrowRight size={18} className="text-brand-600 transition group-hover:translate-x-1 dark:text-brand-400" />
          </Link>
        )}
      </article>

      <CtaBand title={t('portfolio.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />
    </>
  )
}
