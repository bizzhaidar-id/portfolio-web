import { useEffect } from 'react'

export const PAGES = [
  { key: 'home', to: '/' },
  { key: 'portfolio', to: '/portfolio' },
  { key: 'services', to: '/services' },
  { key: 'tools', to: '/tools' },
  { key: 'articles', to: '/articles' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Ibnu Haidar` : 'Ibnu Haidar | Logistics & Operational Excellence'
  }, [title])
}

export function formatDate(date, lang) {
  return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const SOCIALS = {
  instagram: 'https://www.instagram.com/ibnuhaidar.id',
  linkedin: 'https://www.linkedin.com/in/ibnuhaidar',
}
