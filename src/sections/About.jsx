import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'

export default function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="section">
      <Reveal>
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-4 text-lg leading-relaxed md:col-span-3">
            {t('about.body').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            {t('about.stats').map((s) => (
              <div key={s.label} className="card flex flex-col justify-center p-5">
                <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.value}</span>
                <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
