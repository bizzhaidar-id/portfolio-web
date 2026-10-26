import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function CaseStudyCard({ study }) {
  const { t } = useTranslation()
  const to = `/portfolio/${study.slug}`
  return (
    <article className="card group flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {t(`portfolio.categories.${study.category}`)}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
            <Link to={to} className="hover:text-brand-600 dark:hover:text-brand-400">
              {study.title}
            </Link>
          </h3>
          {(study.period || study.method) && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {[study.period, study.method].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        {study.metric && (
          <div className="shrink-0 text-right">
            <span className="block whitespace-nowrap text-2xl font-extrabold tabular-nums text-brand-600 dark:text-brand-400">
              {study.metric}
            </span>
            <span className="block max-w-[9rem] text-xs text-slate-500 dark:text-slate-400">{study.metricLabel}</span>
          </div>
        )}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed">{study.summary}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2">
          {(study.tags ?? []).slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>
        <Link
          to={to}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 hover:text-brand-700 dark:text-brand-400"
        >
          {t('portfolio.readCase')} <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}
