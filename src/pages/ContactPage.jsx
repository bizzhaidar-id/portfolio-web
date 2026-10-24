import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import Contact from '../sections/Contact'

export default function ContactPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHeader title={t('contact.title')} subtitle={t('contact.intro')} />
      <Contact />
    </>
  )
}
