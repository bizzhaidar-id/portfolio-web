import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Download, ExternalLink, Loader2 } from 'lucide-react'

// Loaded lazily from PortfolioPage, so pdf.js only downloads when someone opens a deck.
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

export default function PdfSlides({ file }) {
  const { t } = useTranslation()
  const wrapRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setPage((p) => Math.min(p + 1, numPages || 1))
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(p - 1, 1))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [numPages])

  const navBtn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
  const linkBtn =
    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400'

  return (
    <div>
      <div
        ref={wrapRef}
        className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950"
      >
        <Document
          file={file}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n)
            setPage(1)
          }}
          loading={
            <div className="flex aspect-video items-center justify-center gap-2 text-sm text-slate-500">
              <Loader2 size={18} className="animate-spin" /> {t('portfolio.loading')}
            </div>
          }
          error={
            <div className="flex aspect-video items-center justify-center p-6 text-center text-sm text-slate-500">
              {t('portfolio.error')}
            </div>
          }
        >
          {width > 0 && (
            <Page
              key={page}
              pageNumber={page}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={<div className="aspect-video" />}
            />
          )}
        </Document>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className={navBtn} onClick={() => setPage((p) => p - 1)} disabled={page <= 1} aria-label={t('portfolio.prev')}>
            <ChevronLeft size={20} />
          </button>
          <span className="min-w-[4.5rem] text-center text-sm font-medium tabular-nums text-slate-700 dark:text-slate-200">
            {numPages ? `${page} / ${numPages}` : '– / –'}
          </span>
          <button
            className={navBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={!numPages || page >= numPages}
            aria-label={t('portfolio.next')}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <a href={file} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            <ExternalLink size={16} /> {t('portfolio.openFull')}
          </a>
          <a href={file} download className={linkBtn}>
            <Download size={16} /> {t('portfolio.download')}
          </a>
        </div>
      </div>
    </div>
  )
}
