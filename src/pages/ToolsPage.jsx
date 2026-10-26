import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { ArrowRight, BookOpen, Calculator, FlaskConical, PiggyBank } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

// Tools I built. `demo` links to a live demo page with dummy data, `caseStudy` to the full story.
const BUILT_TOOLS = [
  { key: 'dailyChecker', demo: 'daily-checker', caseStudy: 'export-inland-daily-checker' },
  { key: 'followUp', demo: 'follow-up-converter' },
  { key: 'oneGate', caseStudy: 'one-gate-monitoring-system' },
]

function ToolShowcase({ tool, delay }) {
  const { t } = useTranslation()
  const item = t(`tools.items.${tool.key}`)
  return (
    <Reveal delay={delay} className="card">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.name}</h3>
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          {item.badge}
        </span>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('tools.problem')}</p>
          <p className="mt-1 text-sm leading-relaxed">{item.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('tools.howItWorks')}</p>
          <ol className="mt-1 space-y-1 text-sm">
            {item.steps.map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-bold text-brand-600 dark:text-brand-400">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('tools.impact')}</p>
          <p className="mt-1 text-sm leading-relaxed">{item.impact}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {tool.demo && (
          <Link
            to={`/tools/${tool.demo}`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            <FlaskConical size={16} /> {t('tools.tryDemo')}
          </Link>
        )}
        {tool.caseStudy && (
          <Link
            to={`/portfolio/${tool.caseStudy}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <BookOpen size={16} /> {t('tools.readCase')} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </Reveal>
  )
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200">{label}</span>
      <input
        type="number"
        min="0"
        step="any"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </label>
  )
}

function Result({ label, value }) {
  return (
    <div className="rounded-xl bg-brand-50 p-4 dark:bg-brand-900/30">
      <span className="block text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <span className="text-2xl font-extrabold tabular-nums text-brand-700 dark:text-brand-300">{value}</span>
    </div>
  )
}

function CalcCard({ icon: Icon, title, desc, children, delay }) {
  return (
    <Reveal className="card" delay={delay}>
      <h3 className="flex items-center gap-2.5 text-lg font-semibold text-slate-900 dark:text-white">
        <span className="rounded-lg bg-brand-50 p-1.5 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
          <Icon size={18} />
        </span>
        {title}
      </h3>
      <p className="mb-5 mt-1 text-sm">{desc}</p>
      {children}
    </Reveal>
  )
}

export default function ToolsPage() {
  const { t, i18n } = useTranslation()
  const fmt = (n, digits = 2) =>
    Number.isFinite(n)
      ? n.toLocaleString(i18n.language === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: digits })
      : '–'

  const [cost, setCost] = useState('350')
  const [containers, setContainers] = useState('100')
  const [tonnage, setTonnage] = useState('2500')
  const totalCost = Number(cost) * Number(containers)
  const costPerMt = Number(tonnage) > 0 ? totalCost / Number(tonnage) : NaN
  const payload = Number(containers) > 0 ? Number(tonnage) / Number(containers) : NaN

  const [saving, setSaving] = useState('1')
  const [volume, setVolume] = useState('10000')
  const monthly = Number(saving) * Number(volume)

  return (
    <>
      <PageHeader title={t('tools.title')} subtitle={t('tools.subtitle')} />
      <section className="section">
        <h2 className="section-title">{t('tools.builtTitle')}</h2>
        <div className="space-y-6">
          {BUILT_TOOLS.map((tool, i) => (
            <ToolShowcase key={tool.key} tool={tool} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">{t('tools.calculatorsTitle')}</h2>
        <p className="-mt-6 mb-8 text-sm text-slate-500 dark:text-slate-400">{t('tools.calculatorsDesc')}</p>
        <div className="grid gap-6 md:grid-cols-2">
          <CalcCard icon={Calculator} title={t('tools.costPerMt.title')} desc={t('tools.costPerMt.desc')}>
            <div className="space-y-4">
              <NumberField label={t('tools.costPerMt.costPerContainer')} value={cost} onChange={setCost} />
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label={t('tools.costPerMt.containers')} value={containers} onChange={setContainers} />
                <NumberField label={t('tools.costPerMt.tonnage')} value={tonnage} onChange={setTonnage} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Result label={t('tools.costPerMt.result')} value={fmt(costPerMt)} />
                <Result label={t('tools.costPerMt.payload')} value={fmt(payload, 1)} />
              </div>
            </div>
          </CalcCard>

          <CalcCard icon={PiggyBank} title={t('tools.savings.title')} desc={t('tools.savings.desc')} delay={0.08}>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label={t('tools.savings.savingPerMt')} value={saving} onChange={setSaving} />
                <NumberField label={t('tools.savings.monthlyVolume')} value={volume} onChange={setVolume} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Result label={t('tools.savings.monthly')} value={fmt(monthly, 0)} />
                <Result label={t('tools.savings.annual')} value={fmt(monthly * 12, 0)} />
              </div>
            </div>
          </CalcCard>
        </div>
      </section>
    </>
  )
}
