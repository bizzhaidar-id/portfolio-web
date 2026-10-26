import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import CaseStudyCard from '../components/CaseStudyCard'
import { caseStudies } from '../lib/caseStudies'

export default function PortfolioPage() {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState('all')
  const studies = caseStudies.list(i18n.language)
  // Only offer filters for categories that have at least one published case study.
  const filters = ['all', ...new Set(studies.map((s) => s.category))]
  const items = studies.filter((s) => filter === 'all' || s.category === filter)

  return (
    <>
      <PageHeader title={t('portfolio.title')} subtitle={t('portfolio.subtitle')} />
      <section className="section">
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
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
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.06}>
              <CaseStudyCard study={s} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title={t('home.ctaTitle')} body={t('home.ctaBody')} button={t('home.ctaButton')} />
    </>
  )
}
