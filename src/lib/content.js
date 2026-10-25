import fm from 'front-matter'

// Markdown content lives in src/content/{case-studies,articles,tools}.
// `<slug>.md` is the English (default) version, `<slug>.id.md` the optional Indonesian one;
// a missing translation falls back to English. Files with `draft: true` only show in dev.
function collection(files) {
  const bySlug = {}
  for (const [path, raw] of Object.entries(files)) {
    const [, slug, lang = 'en'] = path.match(/([^/]+?)(?:\.(id))?\.md$/)
    const { attributes, body } = fm(raw)
    if (attributes.draft && import.meta.env.PROD) continue
    bySlug[slug] ??= {}
    bySlug[slug][lang] = { ...attributes, slug, body }
  }
  return (lang) => Object.values(bySlug).map((versions) => versions[lang] ?? versions.en ?? Object.values(versions)[0])
}

// import.meta.glob options must be inline literals, Vite rejects a shared variable.
const caseStudies = collection(import.meta.glob('../content/case-studies/*.md', { query: '?raw', import: 'default', eager: true }))
const articles = collection(import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true }))
const tools = collection(import.meta.glob('../content/tools/*.md', { query: '?raw', import: 'default', eager: true }))

const byOrder = (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)

export const getCaseStudies = (lang) => caseStudies(lang).sort(byOrder)
export const getCaseStudy = (slug, lang) => getCaseStudies(lang).find((c) => c.slug === slug)

export const getArticles = (lang) => articles(lang).sort((a, b) => new Date(b.date) - new Date(a.date))
export const getArticle = (slug, lang) => getArticles(lang).find((a) => a.slug === slug)

export const getTools = (lang) => tools(lang).sort(byOrder)
