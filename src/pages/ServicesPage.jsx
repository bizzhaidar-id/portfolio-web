import { useTranslation } from 'react-i18next'
import { BarChart3, CheckCircle2, ClipboardList, TrendingDown, Workflow } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'

const ICONS = [TrendingDown, Workflow, BarChart3, ClipboardList]

export default function ServicesPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />
      <section className="section">
        <div className="grid gap-6 md:grid-cols-2">
          {t('services.items').map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={s.title} delay={i * 0.08} className="card">
                <span className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <Icon size={24} />
                </span>
                <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </section>
      <CtaBand title={t('services.ctaTitle')} body={t('services.ctaBody')} button={t('services.ctaButton')} />
    </>
  )
}
