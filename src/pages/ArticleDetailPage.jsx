import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar } from 'lucide-react'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { formatDate, usePageTitle } from '../lib/site'
import { getArticle } from '../lib/content'

const ArticleBody = lazy(() => import('../components/ArticleBody'))

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const article = getArticle(slug, i18n.language)
  usePageTitle(article?.title ?? t('articles.notFound'))

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          <ArrowLeft size={16} /> {t('articles.back')}
        </Link>
        {article ? (
          <Reveal>
            <p className="mt-8 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <Calendar size={15} /> {formatDate(article.date, i18n.language)}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{article.summary}</p>
            <hr className="my-8 border-slate-200 dark:border-slate-800" />
            <Suspense fallback={<div className="h-60" />}>
              <ArticleBody>{article.body}</ArticleBody>
            </Suspense>
          </Reveal>
        ) : (
          <p className="mt-8">{t('articles.notFound')}</p>
        )}
      </article>
      {article && <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />}
    </>
  )
}
