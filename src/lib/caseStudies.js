import { createCollection } from './content'

// Every .md file in src/content/case-studies becomes a portfolio case study, sorted by `order`.
// Set `draft: true` in the frontmatter to keep a case study in the repo without showing it.
const files = import.meta.glob('../content/case-studies/*.md', { query: '?raw', import: 'default', eager: true })

export const caseStudies = createCollection(files, (a, b) => (a.order ?? 99) - (b.order ?? 99))
