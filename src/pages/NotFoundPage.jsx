import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../lib/site'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageTitle(t('notFound.title'))
  return (
    <section className="section text-center">
      <p className="text-6xl font-extrabold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{t('notFound.title')}</h1>
      <p className="mt-2">{t('notFound.body')}</p>
      <Link to="/" className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
        {t('notFound.home')}
      </Link>
    </section>
  )
}
