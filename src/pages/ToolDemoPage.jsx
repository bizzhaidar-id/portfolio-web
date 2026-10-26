import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { usePageTitle } from '../lib/site'

const DEMOS = {
  'daily-checker': {
    key: 'dailyChecker',
    caseStudy: 'export-inland-daily-checker',
    Component: lazy(() => import('../demos/DailyCheckerDemo')),
  },
  'follow-up-converter': {
    key: 'followUp',
    Component: lazy(() => import('../demos/FollowUpDemo')),
  },
}

export default function ToolDemoPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const demo = DEMOS[slug]
  const item = demo ? t(`tools.items.${demo.key}`) : null
  usePageTitle(item ? `${item.name} demo` : t('notFound.title'))

  if (!demo) {
    return (
      <section className="section">
        <p>{t('notFound.body')}</p>
        <Link to="/tools" className="mt-4 inline-block font-semibold text-brand-600 dark:text-brand-400">
          {t('tools.back')}
        </Link>
      </section>
    )
  }

  const { Component } = demo
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            <ArrowLeft size={16} /> {t('tools.back')}
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{item.name}</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600 dark:text-slate-400">{item.demoIntro}</p>
          <p className="mt-4 flex max-w-3xl items-start gap-2 rounded-lg bg-sunset-100 px-3 py-2 text-sm text-terracotta-800 dark:bg-terracotta-900/40 dark:text-terracotta-200">
            <Info size={16} className="mt-0.5 shrink-0" /> {t('tools.dummyNote')}
          </p>
        </Reveal>
        <div className="mt-8">
          <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-900" />}>
            <Component />
          </Suspense>
        </div>
        {demo.caseStudy && (
          <Link
            to={`/portfolio/${demo.caseStudy}`}
            className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-600 hover:gap-3 dark:text-brand-400"
          >
            {t('tools.readCase')} <ArrowRight size={16} />
          </Link>
        )}
      </section>
      <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />
    </>
  )
}
