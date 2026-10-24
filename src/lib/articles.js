import fm from 'front-matter'

// Every .md file in src/content/articles becomes an article card, newest first.
const files = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true })

export const articles = Object.entries(files)
  .map(([path, raw]) => {
    const { attributes, body } = fm(raw)
    return {
      slug: path.split('/').pop().replace(/\.md$/, ''),
      title: attributes.title,
      date: attributes.date,
      summary: attributes.summary,
      body,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))
