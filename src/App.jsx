import { lazy, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

// Every page except Home is code-split, so visitors only download what they open.
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const ToolsPage = lazy(() => import('./pages/ToolsPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [dark])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout dark={dark} onToggleDark={() => setDark((d) => !d)} />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<CaseStudyPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticleDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          {/* Removed pages; vercel.json also redirects these server-side. */}
          <Route path="services" element={<Navigate to="/" replace />} />
          <Route path="contact" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
