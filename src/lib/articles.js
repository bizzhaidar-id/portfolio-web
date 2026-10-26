import { createCollection } from './content'

// Every .md file in src/content/articles becomes an article, newest first.
// Add `slug.id.md` next to `slug.md` for the Indonesian version; until then the English one is shown.
const files = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true })

export const articles = createCollection(files, (a, b) => new Date(b.date) - new Date(a.date))
