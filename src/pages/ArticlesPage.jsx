import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import ArticleCard from '../components/ArticleCard'
import { articles } from '../lib/articles'

export default function ArticlesPage() {
  const { t, i18n } = useTranslation()
  const list = articles.list(i18n.language)
  return (
    <>
      <PageHeader title={t('articles.title')} subtitle={t('articles.subtitle')} />
      <section className="section">
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        ) : (
          <p className="card text-center text-slate-500 dark:text-slate-400">{t('articles.empty')}</p>
        )}
      </section>
    </>
  )
}
