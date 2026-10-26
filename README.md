# Ibnu Haidar — Portfolio

Portfolio site built with Vite, React, Tailwind CSS (class-based dark mode), i18next (EN/ID), framer-motion, recharts and react-markdown.

## Run locally

```bash
npm install
npm run dev
```

## Pages

| Menu | URL | File |
| --- | --- | --- |
| Home | `/` | `src/pages/HomePage.jsx` |
| Portfolio | `/portfolio`, `/portfolio/:slug` | `src/pages/PortfolioPage.jsx`, `CaseStudyPage.jsx` |
| Tools | `/tools`, `/tools/daily-checker`, `/tools/follow-up-converter` | `src/pages/ToolsPage.jsx`, `ToolDemoPage.jsx`, demos in `src/demos/` |
| Articles | `/articles`, `/articles/:slug` | `src/pages/ArticlesPage.jsx`, `ArticleDetailPage.jsx` |
| About | `/about` | `src/pages/AboutPage.jsx` |

## Edit content

### Case studies (Portfolio)

One Markdown file per case study in `src/content/case-studies/`:

- `my-project.md` is the English version, `my-project.id.md` the Indonesian one. Without an `.id.md`, the English version is shown in both languages.
- The file name becomes the URL: `/portfolio/my-project`.
- Set `draft: true` in the frontmatter to keep a case study in the repo without showing it on the site.

Frontmatter fields (copy an existing file as a template):

| Field | What it does |
| --- | --- |
| `title`, `summary` | Card and page header |
| `category` | `improvement`, `digital`, `capability` or `research` (filter on the Portfolio page) |
| `order` | Position in the list, lowest first. The first two appear on Home |
| `period`, `role`, `method`, `award` | Optional details under the title |
| `metric`, `metricLabel` | The headline number on the card |
| `tags` | First three are shown on the card |
| `kpis` | Before/after bars: `label`, `before`, `after`, `unit`, `note`, and `lower: true` when a smaller number is better |
| `images` | Optional pictures under the story: `src` (file in `public/case-studies/`) and `alt` |
| `slides` | Optional PDF deck shown as a slide viewer, e.g. `/case-studies/my-project.pdf` (file in `public/case-studies/`). Check it for company data first |
| `tool` | Slug of a tool demo to link to, e.g. `daily-checker` |

Body sections follow the case study flow: starting point, root cause, solution, before/after or results, standardize and roll out.

### Articles

Add `my-article.md` to `src/content/articles/` with `title`, `date` (YYYY-MM-DD) and `summary` frontmatter. Add `my-article.id.md` later for the Indonesian version; until then Indonesian readers see the English one with a short note.

### Everything else

- **Interface text (EN / ID):** `src/i18n/en.js` and `src/i18n/id.js`, including the Home impact numbers and the Tools showcase cards
- **Skill scores:** `COMPETENCIES` and `TOOLS` in `src/sections/Skills.jsx`
- **Certification links:** `src/sections/Certifications.jsx`
- **CV:** replace `public/resume.pdf` (same file name)

## Data rules

No confidential company data on the site: percentages and relative changes instead of absolute figures, and dummy data in every demo and visual. The tool demos in `src/demos/` use invented delivery numbers, vessels, shipping points and transporters.

## Deploy

Vercel builds the site from the main branch. To deploy by hand:

```bash
npx vercel login
npx vercel --prod
```
