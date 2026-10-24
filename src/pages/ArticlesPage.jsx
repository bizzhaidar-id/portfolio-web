import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import ArticleCard from '../components/ArticleCard'
import { articles } from '../lib/articles'

export default function ArticlesPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHeader title={t('articles.title')} subtitle={t('articles.subtitle')} />
      <section className="section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
