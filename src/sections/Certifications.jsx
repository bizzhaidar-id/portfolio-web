import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Award, ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'

const CERTS = [
  {
    name: 'Microsoft Office Specialist: Excel Expert',
    issuer: 'Microsoft',
    date: 'Jun 2026',
    links: [{ key: 'viewBadge', url: 'https://www.credly.com/badges/177e5114-325e-4aa3-8ed8-2ad625007193' }],
  },
  {
    name: 'Supply Chain: Logistics, Operations, Planning, Sourcing',
    issuer: 'Rutgers University via Coursera',
    date: 'May – Jun 2023',
    links: [
      { label: 'Logistics', url: 'https://www.coursera.org/account/accomplishments/verify/L5WL842KPRRQ' },
      { label: 'Operations', url: 'https://www.coursera.org/account/accomplishments/verify/27L4L2UASKGP' },
      { label: 'Planning', url: 'https://www.coursera.org/account/accomplishments/verify/TEQUGF594TXP' },
      { label: 'Sourcing', url: 'https://www.coursera.org/account/accomplishments/verify/WKHZ8447CUMQ' },
    ],
  },
  {
    name: 'Learning Project Management as a Professional',
    issuer: 'MagnaQM',
    date: 'Jul 2021',
    links: [
      {
        key: 'viewCredential',
        url: 'https://www.linkedin.com/in/ibnuhaidar/details/certifications/1781334589049/single-media-viewer',
      },
    ],
  },
  {
    name: 'Problem Solving in the Digital Age',
    issuer: 'University of Leeds via FutureLearn',
    date: 'May – Jun 2020',
    links: [{ key: 'viewCredential', url: 'https://www.futurelearn.com/awards/hvawxu7' }],
  },
]

export default function Certifications() {
  const { t } = useTranslation()
  return (
    <section id="certifications" className="section">
      <Reveal>
        <h2 className="section-title">{t('certifications.title')}</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.name}
            className="card flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="rounded-xl bg-brand-50 p-2.5 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              <Award size={22} />
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{c.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {c.issuer} · {c.date}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 dark:border-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/40"
                  >
                    {l.label ?? t(`certifications.${l.key}`)}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
