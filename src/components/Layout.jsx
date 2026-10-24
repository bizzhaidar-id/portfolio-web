import { Suspense, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Mail } from 'lucide-react'
import Navbar from './Navbar'
import { PAGES, SOCIALS } from '../lib/site'
import LinkedinIcon from './LinkedinIcon'
import InstagramIcon from './InstagramIcon'

const YEAR = new Date().getFullYear()

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function Layout({ dark, onToggleDark }) {
  const { t } = useTranslation()
  return (
    <>
      <ScrollToTop />
      <Navbar dark={dark} onToggleDark={onToggleDark} />
      <main className="min-h-[calc(100vh-4rem)]">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet context={{ dark }} />
        </Suspense>
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {PAGES.map((p) => (
              <li key={p.key}>
                <Link to={p.to} className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  {t(`nav.${p.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <a href="mailto:ibn_haidar@outlook.com" aria-label="Email" className="hover:text-brand-600 dark:hover:text-brand-400">
              <Mail size={20} />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-brand-600 dark:hover:text-brand-400"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-brand-600 dark:hover:text-brand-400"
            >
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>
        <p className="pb-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {YEAR} Ibnu Haidar. {t('footer')}
        </p>
      </footer>
    </>
  )
}
