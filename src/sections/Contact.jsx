import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, AlertCircle, Mail, Send } from 'lucide-react'
import Reveal from '../components/Reveal'
import LinkedinIcon from '../components/LinkedinIcon'

const EMAIL = 'ibn_haidar@outlook.com'
const LINKEDIN = 'https://www.linkedin.com/in/ibnuhaidar'
// With a Web3Forms key (created for EMAIL) set in .env, submissions go through Web3Forms;
// otherwise they go through FormSubmit, which delivers straight to EMAIL with no key.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

async function sendMessage({ name, email, message }) {
  const subject = `New portfolio message from ${name}`
  const res = WEB3FORMS_KEY
    ? await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, name, email, message }),
      })
    : await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: subject, _replyto: email, _template: 'table', _captcha: 'false' }),
      })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false || data.success === 'false') throw new Error(data.message || 'Failed')
}

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.botcheck.value) return
    setStatus('sending')
    try {
      await sendMessage(Object.fromEntries(new FormData(form)))
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="space-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 rounded-xl p-2 font-medium text-slate-800 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400"
              >
                <span className="rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <Mail size={20} />
                </span>
                {EMAIL}
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl p-2 font-medium text-slate-800 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400"
              >
                <span className="rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <LinkedinIcon size={20} />
                </span>
                linkedin.com/in/ibnuhaidar
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card space-y-4 md:col-span-3">
            <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200">{t('contact.name')}</span>
                <input name="name" required className="input" autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200">{t('contact.email')}</span>
                <input name="email" type="email" required className="input" autoComplete="email" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200">{t('contact.message')}</span>
              <textarea name="message" required rows={5} className="input resize-y" />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              <Send size={18} />
              {status === 'sending' ? t('contact.sending') : t('contact.submit')}
            </button>
            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={18} /> {t('contact.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
                <AlertCircle size={18} /> {t('contact.error')}
              </p>
            )}
          </form>
        </div>
      </Reveal>
    </section>
  )
}
