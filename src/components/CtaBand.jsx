import { Mail } from 'lucide-react'
import Reveal from './Reveal'
import LinkedinIcon from './LinkedinIcon'
import { EMAIL, SOCIALS } from '../lib/site'

// Closing contact block: email + LinkedIn only (no contact form).
export default function CtaBand({ title, body, button }) {
  const btn = 'inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition'
  return (
    <section className="section pt-0">
      <Reveal className="rounded-3xl bg-brand-600 px-6 py-12 text-center text-white sm:px-12 dark:bg-brand-700">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${EMAIL}`} className={`${btn} bg-white text-brand-700 hover:bg-brand-50`}>
            <Mail size={18} /> {button}
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn} border border-white/60 text-white hover:bg-white/10`}
          >
            <LinkedinIcon size={18} /> LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  )
}
