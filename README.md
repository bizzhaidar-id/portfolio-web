# Ibnu Haidar — Portfolio

Single-page portfolio built with Vite, React, Tailwind CSS (class-based dark mode), i18next (EN/ID), framer-motion, recharts and react-markdown.

## Run locally

```bash
npm install
npm run dev
```

## Pages

| Menu | URL | File |
| --- | --- | --- |
| Home | `/` | `src/pages/HomePage.jsx` |
| Portfolio | `/portfolio` | `src/pages/PortfolioPage.jsx` |
| Services | `/services` | `src/pages/ServicesPage.jsx` |
| Tools | `/tools` | `src/pages/ToolsPage.jsx` |
| Articles | `/articles`, `/articles/:slug` | `src/pages/ArticlesPage.jsx`, `ArticleDetailPage.jsx` |
| About | `/about` | `src/pages/AboutPage.jsx` (the original landing page sections) |
| Contact | `/contact` | `src/pages/ContactPage.jsx` |

## Edit content

- **Text (EN / ID), incl. portfolio projects, services and toolkit:** `src/i18n/en.js` and `src/i18n/id.js`
- **Skill scores:** `COMPETENCIES` and `TOOLS` in `src/sections/Skills.jsx`
- **Certification links:** `src/sections/Certifications.jsx`
- **Portfolio slides:** export your PowerPoint as PDF and save it in `public/portfolio/` (e.g. `public/portfolio/my-project.pdf`),
  then set `file: '/portfolio/my-project.pdf'` on that portfolio item in both `en.js` and `id.js`. Items without `file` show no "View slides" button.
- **Articles:** add a `.md` file to `src/content/articles/` with `title`, `date` and `summary` frontmatter — it gets its own page at `/articles/<file-name>`
- **CV:** replace `public/resume.pdf` with your real CV (same file name)

## Contact form

By default the form posts to FormSubmit, which delivers to `ibn_haidar@outlook.com` with no API key.
The **first** submission triggers a one-time activation email to that inbox — click the link in it to start receiving messages.

To use Web3Forms instead, create an access key at https://web3forms.com with `ibn_haidar@outlook.com`, then copy `.env.example` to `.env`
and set `VITE_WEB3FORMS_KEY` (also add it as an environment variable in Vercel/Netlify).

## Deploy

```bash
npx vercel login
npx vercel --prod
```

Or on Netlify: `npx netlify-cli deploy --prod --dir=dist` after `npm run build`.
