import { motion } from 'framer-motion'

export default function ProgressBar({ label, value, index = 0 }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span className="text-slate-800 dark:text-slate-200">{label}</span>
        <span className="tabular-nums text-slate-500 dark:text-slate-400">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-400 dark:to-brand-600"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
