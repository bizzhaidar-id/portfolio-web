import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { usePageTitle } from '../lib/site'
import { getCaseStudy } from '../lib/content'

const ArticleBody = lazy(() => import('../components/ArticleBody'))
const PdfSlides = lazy(() => import('../components/PdfSlides'))

export default function CaseStudyPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const study = getCaseStudy(slug, i18n.language)
  usePageTitle(study?.title ?? t('portfolio.notFound'))

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          <ArrowLeft size={16} /> {t('portfolio.back')}
        </Link>
        {study ? (
          <Reveal>
            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {t(`portfolio.categories.${study.category}`)} · {study.context}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {study.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{study.summary}</p>
            {study.metric && (
              <p className="mt-6">
                <span className="block text-3xl font-extrabold text-brand-600 dark:text-brand-400">{study.metric}</span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">{study.metricLabel}</span>
              </p>
            )}
            {study.tags?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <hr className="my-8 border-slate-200 dark:border-slate-800" />
            {study.body.trim() && (
              <Suspense fallback={<div className="h-60" />}>
                <ArticleBody>{study.body}</ArticleBody>
              </Suspense>
            )}
            {study.file && (
              <Suspense fallback={<div className="mt-8 aspect-video rounded-xl bg-slate-100 dark:bg-slate-950" />}>
                <div className="mt-8">
                  <PdfSlides file={study.file} />
                </div>
              </Suspense>
            )}
          </Reveal>
        ) : (
          <p className="mt-8">{t('portfolio.notFound')}</p>
        )}
      </article>
      {study && <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />}
    </>
  )
}
