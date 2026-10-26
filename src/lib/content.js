import fm from 'front-matter'

// Markdown content with an optional Indonesian twin: `slug.md` is English, `slug.id.md` is Indonesian.
// Pages ask for a language and fall back to English when the twin does not exist yet.
function load(files) {
  const bySlug = {}
  for (const [path, raw] of Object.entries(files)) {
    const name = path.split('/').pop().replace(/\.md$/, '')
    const [slug, lang = 'en'] = name.split('.')
    const { attributes, body } = fm(raw)
    bySlug[slug] ??= {}
    bySlug[slug][lang] = { ...attributes, slug, lang, body }
  }
  return bySlug
}

function pick(entry, lang) {
  return entry[lang] ?? entry.en
}

export function createCollection(files, sort) {
  const bySlug = load(files)
  const published = Object.keys(bySlug).filter((slug) => bySlug[slug].en && !bySlug[slug].en.draft)
  return {
    list: (lang) => published.map((slug) => pick(bySlug[slug], lang)).sort(sort),
    get: (slug, lang) => (published.includes(slug) ? pick(bySlug[slug], lang) : undefined),
  }
}
