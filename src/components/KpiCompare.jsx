import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

const fmt = (n, lang) => Number(n).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: 1 })

// Before/after bars on a relative scale: each KPI is scaled to its own larger value, so no absolute
// company figures are needed. `lower: true` marks KPIs where a smaller number is the improvement.
export default function KpiCompare({ kpis }) {
  const { t, i18n } = useTranslation()
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {kpis.map((k, i) => {
        const max = Math.max(k.before, k.after) || 1
        const bars = [
          { key: 'before', value: k.before, cls: 'bg-slate-300 dark:bg-slate-600' },
          { key: 'after', value: k.after, cls: 'bg-brand-600 dark:bg-brand-400' },
        ]
        return (
          <Reveal key={k.label} delay={i * 0.06} className="card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{k.label}</h3>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {k.lower ? '↓' : '↑'} {t('portfolio.better')}
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {bars.map((b) => (
                <div key={b.key} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-xs text-slate-500 dark:text-slate-400">{t(`portfolio.${b.key}`)}</span>
                  <div className="h-6 flex-1 rounded bg-slate-100 dark:bg-slate-800">
                    <div className={`h-6 rounded ${b.cls}`} style={{ width: `${Math.max((b.value / max) * 100, 1.5)}%` }} />
                  </div>
                  <span className="w-20 shrink-0 text-right text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                    {fmt(b.value, i18n.language)}
                    {k.unit}
                  </span>
                </div>
              ))}
            </div>
            {k.note && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{k.note}</p>}
          </Reveal>
        )
      })}
    </div>
  )
}
