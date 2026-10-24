import { useOutletContext } from 'react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../lib/site'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import { Experience, Education } from '../sections/Experience'
import Certifications from '../sections/Certifications'

const ANCHORS = ['about', 'skills', 'experience', 'education', 'certifications']

export default function AboutPage() {
  const { dark } = useOutletContext()
  const { t } = useTranslation()
  usePageTitle(t('nav.about'))

  return (
    <>
      <Hero />
      <nav className="sticky top-16 z-30 border-y border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <ul className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {ANCHORS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
              >
                {t(`${id}.title`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <About />
      <Skills dark={dark} />
      <Experience />
      <Education />
      <Certifications />
    </>
  )
}
