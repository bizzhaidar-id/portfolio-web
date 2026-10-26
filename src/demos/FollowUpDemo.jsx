import { useState } from 'react'
import { Check, Copy, Loader2, Plus, ScanText, Trash2 } from 'lucide-react'

// Dummy "Planning DCR" report. Transporter names and quantities are invented.
const KEYS = ['paper20', 'paper40', 'tissue20', 'tissue40']
const KLAB = ["P 20'", "P 40'", "T 20'", "T 40'"]
const SAMPLE_DATE = '22-OCT'
const SAMPLE = [
  { emkl: 'Transporter A', plan: [6, 4, 0, 2], real: [6, 3, 0, 2] },
  { emkl: 'Transporter B', plan: [3, 5, 2, 0], real: [3, 5, 2, 0] },
  { emkl: 'Transporter C', plan: [0, 6, 0, 3], real: [0, 4, 0, 1] },
  { emkl: 'Transporter D', plan: [4, 2, 1, 1], real: [2, 2, 1, 0] },
]
const toRow = (s) => ({
  emkl: s.emkl,
  plan: Object.fromEntries(KEYS.map((k, i) => [k, s.plan[i]])),
  real: Object.fromEntries(KEYS.map((k, i) => [k, s.real[i]])),
})
const blank = () => ({ emkl: '', plan: Object.fromEntries(KEYS.map((k) => [k, 0])), real: Object.fromEntries(KEYS.map((k) => [k, 0])) })

const num = (v) => {
  const n = parseInt(String(v).replace(/[^\d]/g, ''), 10)
  return Number.isNaN(n) ? 0 : n
}

// Same calculation and message format as the working tool.
function calc(r) {
  const p20 = r.plan.paper20 + r.plan.tissue20
  const p40 = r.plan.paper40 + r.plan.tissue40
  const a20 = r.real.paper20 + r.real.tissue20
  const a40 = r.real.paper40 + r.real.tissue40
  const pct = (re, pl) => (pl > 0 ? `${Math.round((re / pl) * 100)} %` : '-')
  return { p20, p40, a20, a40, o20: Math.max(0, p20 - a20), o40: Math.max(0, p40 - a40), z: pct(a20, p20), w: pct(a40, p40) }
}

function message(r, date) {
  const c = calc(r)
  return `📊 *Planning vs Realization - ${r.emkl.trim().replace(/\s+/g, ' ')}* on ${date || 'DD-MMM'}
📝 Planning : ${c.p20}x20', ${c.p40}x40'
✅ Realization : ${c.a20}x20', ${c.a40}x40'
🚨 *Outstanding: ${c.o20}x20', ${c.o40}x40'*
🏆 *Achievement*
📦 20' : ${c.z}
📦 40' : ${c.w}
🎯 *Target : Planning = Realization*`
}

function CopyButton({ text, label = 'Copy', className = '' }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      window.prompt('Copy the message:', text)
    }
  }
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
        done ? 'bg-emerald-600 text-white' : 'bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500'
      } ${className}`}
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? 'Copied' : label}
    </button>
  )
}

function SampleReport() {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white text-[11px] text-slate-800 dark:border-slate-700">
      <p className="bg-slate-800 px-3 py-1.5 text-center font-bold text-white">PLANNING DCR: 22 OCTOBER 2026</p>
      <table className="w-full min-w-[30rem] text-center">
        <thead className="bg-slate-100">
          <tr>
            <th rowSpan={2} className="border border-slate-300 px-2 py-1 text-left">EMKL</th>
            <th colSpan={4} className="border border-slate-300 px-2 py-1">PLANNING</th>
            <th colSpan={4} className="border border-slate-300 px-2 py-1">REALIZATION</th>
          </tr>
          <tr>
            {[...KLAB, ...KLAB].map((l, i) => (
              <th key={i} className="border border-slate-300 px-1.5 py-1 font-medium">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SAMPLE.map((s) => (
            <tr key={s.emkl}>
              <td className="border border-slate-300 px-2 py-1 text-left">{s.emkl}</td>
              {[...s.plan, ...s.real].map((v, i) => (
                <td key={i} className="border border-slate-300 px-1.5 py-1 tabular-nums">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function FollowUpDemo() {
  const [rows, setRows] = useState([])
  const [date, setDate] = useState('')
  const [reading, setReading] = useState(false)

  const read = () => {
    setReading(true)
    setTimeout(() => {
      setRows(SAMPLE.map(toRow))
      setDate(SAMPLE_DATE)
      setReading(false)
    }, 900)
  }
  const update = (i, fn) => setRows((rs) => rs.map((r, j) => (j === i ? fn(structuredClone(r)) : r)))
  const valid = rows.filter((r) => r.emkl.trim())
  const all = valid.map((r) => message(r, date)).join('\n\n')

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-6">
        <div className="card p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs text-white">1</span>
            Report image
          </h3>
          <p className="mb-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
            A dummy Planning DCR report, standing in for the screenshot the team receives every day.
          </p>
          <SampleReport />
          <button
            onClick={read}
            disabled={reading}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60 dark:bg-brand-500"
          >
            {reading ? <Loader2 size={16} className="animate-spin" /> : <ScanText size={16} />} {reading ? 'Reading…' : 'Read report'}
          </button>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            In the working version, Claude reads these numbers from the screenshot. This demo loads them from the sample instead.
          </p>
        </div>

        <div className="card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs text-white">2</span>
              Check the numbers
            </h3>
            <label className="flex items-center gap-2 text-sm font-medium">
              Date
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder={SAMPLE_DATE} className="input w-28 px-2 py-1 text-sm" />
            </label>
          </div>
          {!rows.length && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No transporter rows yet. Read the report or add a row.</p>
          )}
          <div className="mt-3 space-y-3">
            {rows.map((r, i) => {
              const c = calc(r)
              return (
                <div key={i} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex gap-2">
                    <input
                      value={r.emkl}
                      onChange={(e) => update(i, (x) => ((x.emkl = e.target.value), x))}
                      placeholder="Transporter name"
                      aria-label="Transporter name"
                      className="input px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))}
                      aria-label="Remove row"
                      className="rounded-lg border border-slate-300 px-2 text-slate-500 hover:text-rose-600 dark:border-slate-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <table className="mt-2 w-full text-center text-xs">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400">
                        <th />
                        {KLAB.map((l) => (
                          <th key={l} className="py-1 font-medium">
                            {l}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['plan', 'real'].map((g) => (
                        <tr key={g}>
                          <th className="pr-2 text-left font-medium">{g === 'plan' ? 'Plan' : 'Real'}</th>
                          {KEYS.map((k, j) => (
                            <td key={k} className="p-0.5">
                              <input
                                inputMode="numeric"
                                value={r[g][k]}
                                onChange={(e) => update(i, (x) => ((x[g][k] = num(e.target.value)), x))}
                                onFocus={(e) => e.target.select()}
                                aria-label={`${g === 'plan' ? 'Plan' : 'Real'} ${KLAB[j]}`}
                                className="input px-1 py-1 text-center text-xs tabular-nums"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-right text-xs text-slate-500 dark:text-slate-400">
                    Outstanding 20': <b className="text-slate-900 dark:text-white">{c.o20}</b> · 40':{' '}
                    <b className="text-slate-900 dark:text-white">{c.o40}</b>
                  </p>
                </div>
              )
            })}
          </div>
          <button
            onClick={() => setRows((rs) => [...rs, blank()])}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Plus size={14} /> Add row
          </button>
        </div>
      </div>

      <div className="card min-w-0 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs text-white">3</span>
            Copy messages
          </h3>
          {valid.length > 0 && <CopyButton text={all} label="Copy all" />}
        </div>
        <p className="mb-3 mt-1 text-xs text-slate-500 dark:text-slate-400">One WhatsApp message per transporter. Edit any number and the message updates.</p>
        <div className="space-y-3 rounded-xl bg-[#e5ddd5] p-3 dark:bg-slate-950">
          {valid.length ? (
            valid.map((r, i) => {
              const c = calc(r)
              const done = c.o20 === 0 && c.o40 === 0
              return (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        done ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {done ? 'On target' : `Outstanding ${c.o20 + c.o40}`}
                    </span>
                    <CopyButton text={message(r, date)} />
                  </div>
                  <pre className="whitespace-pre-wrap rounded-lg bg-[#dcf8c6] px-3 py-2 font-sans text-[13px] leading-relaxed text-slate-900 shadow-sm">
                    {message(r, date)}
                  </pre>
                </div>
              )
            })
          ) : (
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Example format</p>
              <pre className="whitespace-pre-wrap rounded-lg bg-[#dcf8c6] px-3 py-2 font-sans text-[13px] leading-relaxed text-slate-900 opacity-70 shadow-sm">
                {message(toRow({ emkl: 'Transporter X', plan: [5, 3, 0, 0], real: [4, 3, 0, 0] }), SAMPLE_DATE)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
