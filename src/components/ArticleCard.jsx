import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calendar } from 'lucide-react'
import { formatDate } from '../lib/site'

export default function ArticleCard({ article, index = 0 }) {
  const { t, i18n } = useTranslation()
  return (
    <motion.article
      className="card flex flex-col transition hover:-translate-y-1 hover:shadow-md"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Calendar size={14} />
        {formatDate(article.date, i18n.language)}
      </p>
      <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-white">
        <Link to={`/articles/${article.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed">{article.summary}</p>
      <Link
        to={`/articles/${article.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-600 hover:gap-2.5 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
      >
        {t('articles.readMore')} <ArrowRight size={16} />
      </Link>
    </motion.article>
  )
}
