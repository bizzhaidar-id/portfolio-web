# Ibnu Haidar — Portfolio

Portfolio built with Vite, React, Tailwind CSS (class-based dark mode), i18next (EN/ID), framer-motion, recharts and react-markdown.

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
| Tools | `/tools` | `src/pages/ToolsPage.jsx` |
| Articles | `/articles`, `/articles/:slug` | `src/pages/ArticlesPage.jsx`, `ArticleDetailPage.jsx` |
| About | `/about` | `src/pages/AboutPage.jsx` (the original landing page sections) |

Any other URL shows `src/pages/NotFoundPage.jsx`. The old `/services` and `/contact` pages redirect to `/`.

## Edit content

- **UI text (EN / ID), incl. toolkit list:** `src/i18n/en.js` and `src/i18n/id.js`. English is the default language.
- **Markdown content:** `src/content/case-studies`, `src/content/articles`, `src/content/tools`, loaded by `src/lib/content.js`.
  - `<slug>.md` is the English version, `<slug>.id.md` the optional Indonesian one (falls back to English).
  - The file name is the URL: `src/content/articles/my-post.md` → `/articles/my-post`, `src/content/case-studies/my-project.md` → `/portfolio/my-project`.
  - Each folder has an `example-*.md` with every front matter field. `draft: true` hides a file from the production build.
- **Portfolio slides:** export your PowerPoint as PDF into `public/portfolio/` and set `file: "/portfolio/my-project.pdf"` in the case study front matter.
- **Skill scores:** `COMPETENCIES` and `TOOLS` in `src/sections/Skills.jsx`
- **Certification links:** `src/sections/Certifications.jsx`
- **CV:** replace `public/resume.pdf` with your real CV (same file name)

## Deploy

```bash
npx vercel login
npx vercel --prod
```

Or on Netlify: `npx netlify-cli deploy --prod --dir=dist` after `npm run build`.
