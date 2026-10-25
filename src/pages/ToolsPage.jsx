import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calculator, PiggyBank, Wrench } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { getTools } from '../lib/content'

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

  const [saving, setSaving] = useState('2.5')
  const [volume, setVolume] = useState('13000')
  const monthly = Number(saving) * Number(volume)
  const resources = getTools(i18n.language)

  return (
    <>
      <PageHeader title={t('tools.title')} subtitle={t('tools.subtitle')} />
      <section className="section">
        <h2 className="section-title">{t('tools.calculatorsTitle')}</h2>
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

      <section className="section pt-0">
        <h2 className="section-title">{t('tools.toolkitTitle')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t('tools.toolkit').map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.06} className="card flex items-start gap-4">
              <span className="rounded-xl bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <Wrench size={20} />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                <p className="mt-1 text-sm">{tool.use}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {resources.length > 0 && (
        <section className="section pt-0">
          <h2 className="section-title">{t('tools.resourcesTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06} className="card flex flex-col">
                <h3 className="font-semibold text-slate-900 dark:text-white">{r.title}</h3>
                <p className="mt-1 flex-1 text-sm">{r.summary}</p>
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                  >
                    {t('tools.open')} <ArrowRight size={16} />
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
