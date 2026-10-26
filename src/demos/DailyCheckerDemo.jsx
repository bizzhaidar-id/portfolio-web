import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CheckCircle2, Download, FileSpreadsheet, RotateCcw, XCircle } from 'lucide-react'
import { DELIVERY_RE, OUTSTANDING, SAMPLE_PLAN } from './dailyCheckerData'

const STATUS = ['all', 'planned', 'notPlanned']
const STATUS_LABEL = { all: 'All', planned: 'Planned', notPlanned: 'Not planned' }
const fmtMt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function Stat({ label, value, sub, qty, tone }) {
  const border = { brand: 'border-t-brand-600', green: 'border-t-emerald-600', red: 'border-t-rose-600', slate: 'border-t-slate-400' }
  return (
    <div className={`card border-t-4 p-4 ${border[tone]}`}>
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
      <span className="mt-1 block text-3xl font-extrabold tabular-nums text-slate-900 dark:text-white">{value}</span>
      {sub && <span className="block text-xs text-slate-500 dark:text-slate-400">{sub}</span>}
      {qty !== undefined && (
        <span className="mt-2 block border-t border-slate-200 pt-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
          NW: <span className="tabular-nums">{fmtMt(qty)}</span> MT
        </span>
      )}
    </div>
  )
}

function downloadCsv(rows) {
  const head = ['Delivery', 'ETD', 'SP', 'Destination', 'Vessel', 'Voyage', 'Terminal', 'Closing', '20', '40', 'HC', 'NW']
  const lines = rows.map((r) =>
    [r.delivery, r.etd, r.sp, r.destination, r.vessel, r.voyage, r.terminal, r.closing, r.c20, r.c40, r.hc, r.nw]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  )
  const url = URL.createObjectURL(new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'not-planned-sample.csv' })
  a.click()
  URL.revokeObjectURL(url)
}

// Same logic as the working tool: a delivery is "planned" when its number appears anywhere in the plan file.
export default function DailyCheckerDemo() {
  const { dark } = useOutletContext()
  const [planText, setPlanText] = useState(SAMPLE_PLAN)
  const [status, setStatus] = useState('all')
  const [sp, setSp] = useState(null)

  const { rows, planList, orphans } = useMemo(() => {
    const planList = [...new Set((planText.match(DELIVERY_RE) ?? []).map((d) => d.toUpperCase()))]
    const planSet = new Set(planList)
    const known = new Set(OUTSTANDING.map((d) => d.delivery))
    return {
      planList,
      orphans: planList.filter((d) => !known.has(d)),
      rows: OUTSTANDING.map((d) => ({ ...d, planned: planSet.has(d.delivery) })),
    }
  }, [planText])

  const planned = rows.filter((r) => r.planned)
  const notPlanned = rows.filter((r) => !r.planned)
  const sum = (list) => list.reduce((s, r) => s + r.nw, 0)

  const bySp = useMemo(() => {
    const m = {}
    for (const r of rows) {
      m[r.sp] ??= { sp: r.sp, planned: 0, notPlanned: 0 }
      m[r.sp][r.planned ? 'planned' : 'notPlanned'] += r.nw
    }
    return Object.values(m)
      .sort((a, b) => a.sp.localeCompare(b.sp))
      .map((x) => ({ ...x, planned: Math.round(x.planned * 10) / 10, notPlanned: Math.round(x.notPlanned * 10) / 10 }))
  }, [rows])

  const visible = rows
    .filter((r) => status === 'all' || (status === 'planned') === r.planned)
    .filter((r) => !sp || r.sp === sp)
    .sort((a, b) => a.etd.localeCompare(b.etd) || a.delivery.localeCompare(b.delivery))

  const axis = dark ? '#94a3b8' : '#64748b'
  const grid = dark ? '#1e293b' : '#e2e8f0'

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <aside className="space-y-4">
        <div className="card p-4">
          <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <FileSpreadsheet size={18} className="text-brand-600 dark:text-brand-400" /> Outstanding list
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono dark:bg-slate-800">outstanding-sample.xlsx</span> ·{' '}
            {OUTSTANDING.length} deliveries
          </p>
        </div>
        <div className="card p-4">
          <label htmlFor="plan" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <FileSpreadsheet size={18} className="text-amber-600" /> Plan list
          </label>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Delivery numbers already planned. Delete or paste numbers and the results update.
          </p>
          <textarea
            id="plan"
            value={planText}
            onChange={(e) => setPlanText(e.target.value)}
            rows={10}
            spellCheck={false}
            className="input mt-3 resize-y font-mono text-xs"
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{planList.length} unique deliveries found</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setPlanText(SAMPLE_PLAN)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <RotateCcw size={14} /> Reset sample
            </button>
            <button
              onClick={() => setPlanText('')}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Clear plan
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-6">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Stat tone="brand" label="Outstanding" value={rows.length} qty={sum(rows)} />
          <Stat
            tone="green"
            label="Planned"
            value={planned.length}
            sub={`${Math.round((planned.length / rows.length) * 100)}% of outstanding`}
            qty={sum(planned)}
          />
          <Stat tone="red" label="Not yet planned" value={notPlanned.length} sub="needs a plan entry" qty={sum(notPlanned)} />
          <Stat tone="slate" label="Plan list size" value={planList.length} />
        </div>

        <div className="card border-l-4 border-l-amber-500 p-4">
          <p className="font-semibold text-slate-900 dark:text-white">Plan entries not found in Outstanding</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Likely already shipped, cancelled, or a data mismatch worth checking.
          </p>
          {orphans.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {orphans.map((d) => (
                <span key={d} className="rounded bg-slate-100 px-2 py-1 font-mono text-xs dark:bg-slate-800">
                  {d}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">Every plan entry matches an outstanding delivery.</p>
          )}
        </div>

        <div className="card p-4">
          <p className="font-semibold text-slate-900 dark:text-white">Net weight by shipping point (MT)</p>
          <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">Click a bar to filter the table by that shipping point.</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bySp} onClick={(e) => e?.activeLabel && setSp((cur) => (cur === e.activeLabel ? null : e.activeLabel))}>
                <CartesianGrid vertical={false} stroke={grid} />
                <XAxis dataKey="sp" tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  cursor={{ fill: dark ? '#1e293b' : '#f1f5f9' }}
                  contentStyle={{ background: dark ? '#0f172a' : '#fff', border: `1px solid ${grid}`, borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="planned" name="Planned" stackId="a" fill="#059669" className="cursor-pointer">
                  {bySp.map((d) => (
                    <Cell key={d.sp} fillOpacity={!sp || sp === d.sp ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="notPlanned" name="Not planned" stackId="a" fill="#e11d48" radius={[4, 4, 0, 0]} className="cursor-pointer">
                  {bySp.map((d) => (
                    <Cell key={d.sp} fillOpacity={!sp || sp === d.sp ? 1 : 0.3} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700">
              {STATUS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 text-xs font-semibold ${
                    status === s ? 'bg-brand-600 text-white dark:bg-brand-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
            {sp && (
              <button
                onClick={() => setSp(null)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800"
              >
                SP: {sp} ✕
              </button>
            )}
            <button
              onClick={() => downloadCsv(notPlanned)}
              disabled={!notPlanned.length}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-40 dark:bg-brand-500"
            >
              <Download size={14} /> Export not planned (CSV)
            </button>
          </div>
          <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            Showing {visible.length} of {rows.length} outstanding deliveries
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[56rem] text-left text-xs">
              <thead className="bg-slate-900 text-[11px] uppercase tracking-wider text-white dark:bg-slate-800">
                <tr>
                  {['Status', 'ETD', 'Delivery', 'SP', 'Destination', 'Vessel', 'Terminal', 'Closing', '20', '40', 'HC', 'NW'].map((h) => (
                    <th key={h} className="px-3 py-2 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.delivery} className="border-t border-slate-200 odd:bg-white even:bg-slate-50 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-900/60">
                    <td className="px-3 py-2">
                      {r.planned ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          <CheckCircle2 size={12} /> Planned
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded bg-rose-100 px-2 py-0.5 font-semibold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                          <XCircle size={12} /> Not planned
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">{r.etd}</td>
                    <td className="px-3 py-2 font-mono">{r.delivery}</td>
                    <td className="whitespace-nowrap px-3 py-2">{r.sp}</td>
                    <td className="whitespace-nowrap px-3 py-2">{r.destination}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {r.vessel} <span className="text-slate-500">{r.voyage}</span>
                    </td>
                    <td className="px-3 py-2">{r.terminal}</td>
                    <td className="whitespace-nowrap px-3 py-2">{r.closing}</td>
                    <td className="px-3 py-2 text-center">{r.c20}</td>
                    <td className="px-3 py-2 text-center">{r.c40}</td>
                    <td className="px-3 py-2 text-center">{r.hc}</td>
                    <td className="px-3 py-2 text-right font-mono">{fmtMt(r.nw)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
