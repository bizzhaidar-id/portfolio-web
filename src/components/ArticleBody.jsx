import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Renders article and case study Markdown (GFM, so tables work). Loaded lazily by the detail pages.
export default function ArticleBody({ children }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-terracotta-600 prose-th:text-left dark:prose-a:text-terracotta-300">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  )
}
