import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Download, Mail } from 'lucide-react'
import LinkedinIcon from '../components/LinkedinIcon'
import { EMAIL, SOCIALS } from '../lib/site'

export default function Hero() {
  const { t } = useTranslation()
  const secondary =
    'inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800'
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sunset-200/70 via-brand-50/40 to-transparent dark:from-brand-900/30" />
      <motion.div
        className="mx-auto flex max-w-5xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="mb-3 font-medium text-terracotta-600 dark:text-terracotta-300">{t('hero.greeting')}</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl dark:text-white">
          {t('hero.name')}
        </h1>
        <p className="mt-5 max-w-3xl text-xl font-semibold text-slate-700 sm:text-2xl dark:text-slate-200">
          {t('hero.title')}
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t('hero.tagline')}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            <Download size={18} />
            {t('hero.downloadCv')}
          </a>
          <a href={`mailto:${EMAIL}`} className={secondary}>
            <Mail size={18} />
            {t('hero.contactMe')}
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
            <LinkedinIcon size={18} />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}
