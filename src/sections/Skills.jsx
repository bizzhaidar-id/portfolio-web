import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Compass, Languages, Target, Wrench } from 'lucide-react'
import Reveal from '../components/Reveal'
import ProgressBar from '../components/ProgressBar'

const SkillsRadar = lazy(() => import('../components/SkillsRadar'))

const COMPETENCIES = [
  { key: 'ci', value: 92 },
  { key: 'da', value: 88 },
  { key: 'pr', value: 87 },
  { key: 'op', value: 89 },
  { key: 'ps', value: 90 },
  { key: 'pm', value: 82 },
  { key: 'tm', value: 93 },
]

const TOOLS = [
  { label: 'Microsoft Excel', value: 95 },
  { label: 'Microsoft PowerPoint', value: 90 },
  { label: 'Power BI', value: 80 },
  { label: 'TMS', value: 88 },
  { label: 'SAP S/4 HANA', value: 85 },
  { label: 'Claude', value: 85 },
]

function Column({ icon: Icon, title, delay, children }) {
  return (
    <Reveal className="card flex flex-col" delay={delay}>
      <h3 className="mb-5 flex items-center gap-2.5 text-base font-semibold text-slate-900 dark:text-white">
        <span className="rounded-lg bg-brand-50 p-1.5 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
          <Icon size={18} />
        </span>
        {title}
      </h3>
      {children}
    </Reveal>
  )
}

export default function Skills({ dark }) {
  const { t } = useTranslation()
  const radarData = COMPETENCIES.map((c) => ({ skill: t(`skills.radar.${c.key}`), value: c.value }))

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="section-title">{t('skills.title')}</h2>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Column icon={Compass} title={t('skills.interests')}>
          <ul className="flex flex-wrap gap-2">
            {t('skills.interestItems').map((item) => (
              <li
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </Column>

        <Column icon={Target} title={t('skills.competencies')} delay={0.08}>
          <ul className="space-y-3">
            {COMPETENCIES.map(({ key }) => {
              const c = t(`skills.competencyItems.${key}`)
              return (
                <li key={key} className="flex gap-2.5 text-sm">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                  <span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{c.name}</span>
                    {c.detail && <span className="block text-xs text-slate-500 dark:text-slate-400">{c.detail}</span>}
                  </span>
                </li>
              )
            })}
          </ul>
        </Column>

        <Column icon={Wrench} title={t('skills.tools')} delay={0.16}>
          <div className="space-y-4">
            {TOOLS.map((tool, i) => (
              <ProgressBar key={tool.label} label={tool.label} value={tool.value} index={i} />
            ))}
          </div>
        </Column>

        <Column icon={Languages} title={t('skills.languages')} delay={0.24}>
          <ul className="space-y-5">
            {t('skills.languageItems').map((l) => (
              <li key={l.name}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{l.name}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{l.level}</span>
                <div className="mt-2 flex gap-1.5" aria-label={`${l.score}/5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`h-2 flex-1 rounded-full ${
                        n <= l.score ? 'bg-brand-600 dark:bg-brand-400' : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Column>
      </div>

      <Reveal className="card mt-5">
        <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">{t('skills.profile')}</h3>
        <Suspense
          fallback={
            <div className="flex h-[340px] items-center justify-center text-sm text-slate-400">{t('skills.loading')}</div>
          }
        >
          <SkillsRadar data={radarData} dark={dark} />
        </Suspense>
      </Reveal>
    </section>
  )
}
