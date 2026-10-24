import Markdown from 'react-markdown'

// Loaded lazily from Articles.jsx; react-markdown is only needed once a modal opens.
export default function ArticleBody({ children }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-brand-600 dark:prose-a:text-brand-400">
      <Markdown>{children}</Markdown>
    </div>
  )
}
