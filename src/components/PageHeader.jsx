import Reveal from './Reveal'
import { usePageTitle } from '../lib/site'

export default function PageHeader({ title, subtitle }) {
  usePageTitle(title)
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-transparent dark:border-slate-800 dark:from-brand-900/20">
      <Reveal className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </Reveal>
    </div>
  )
}
