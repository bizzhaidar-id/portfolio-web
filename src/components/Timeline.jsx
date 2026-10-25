import { motion } from 'framer-motion'

export function Timeline({ children }) {
  return (
    <ol className="relative ml-3 border-l-2 border-slate-200 dark:border-slate-800">{children}</ol>
  )
}

export function TimelineItem({ title, subtitle, meta, period, icon: Icon, children, index = 0 }) {
  return (
    <motion.li
      className="relative mb-10 ml-8 last:mb-0"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <span className="absolute -left-[2.85rem] flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white ring-4 ring-sunset-50 dark:bg-brand-600 dark:ring-slate-950">
        {Icon ? <Icon size={15} /> : <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <div className="card">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-sm font-medium text-brand-700 dark:text-brand-300">{subtitle}</p>}
            {meta && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{meta}</p>}
          </div>
          {period && (
            <time className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {period}
            </time>
          )}
        </div>
        {children && <div className="mt-3 text-sm leading-relaxed">{children}</div>}
      </div>
    </motion.li>
  )
}
