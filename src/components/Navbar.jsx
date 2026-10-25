import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { PAGES, SOCIALS } from '../lib/site'
import InstagramIcon from './InstagramIcon'
import LinkedinIcon from './LinkedinIcon'

const SOCIAL_LINKS = [
  { label: 'Instagram', href: SOCIALS.instagram, icon: InstagramIcon },
  { label: 'LinkedIn', href: SOCIALS.linkedin, icon: LinkedinIcon },
]

export default function Navbar({ dark, onToggleDark }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')
  const iconBtn =
    'flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
        : 'text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          Ibnu Haidar<span className="text-brand-600 dark:text-brand-400">.</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {PAGES.map((p) => (
            <li key={p.key}>
              <NavLink to={p.to} end={p.to === '/'} className={linkClass}>
                {t(`nav.${p.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 border-r border-slate-200 pr-2 sm:flex dark:border-slate-700">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={iconBtn}>
                <Icon size={16} />
              </a>
            ))}
          </div>
          <button onClick={toggleLang} className={iconBtn} aria-label={t('nav.toggleLang')}>
            <Languages size={16} />
            {i18n.language === 'en' ? 'ID' : 'EN'}
          </button>
          <button onClick={onToggleDark} className={iconBtn} aria-label={t('nav.toggleTheme')}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`${iconBtn} lg:hidden`}
            aria-label={t('nav.menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="grid gap-1 border-t border-slate-200 px-4 py-3 lg:hidden dark:border-slate-800">
          {PAGES.map((p) => (
            <li key={p.key}>
              <NavLink to={p.to} end={p.to === '/'} onClick={() => setOpen(false)} className={(s) => `block ${linkClass(s)}`}>
                {t(`nav.${p.key}`)}
              </NavLink>
            </li>
          ))}
          <li className="mt-2 flex gap-2 border-t border-slate-200 pt-3 sm:hidden dark:border-slate-800">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={iconBtn}>
                <Icon size={16} />
                {label}
              </a>
            ))}
          </li>
        </ul>
      )}
    </header>
  )
}
