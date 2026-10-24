import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function CtaBand({ title, body, button, to = '/contact' }) {
  return (
    <section className="section pt-0">
      <Reveal className="rounded-3xl bg-brand-600 px-6 py-12 text-center text-white sm:px-12 dark:bg-brand-700">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">{body}</p>
        <Link
          to={to}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          {button} <ArrowRight size={18} />
        </Link>
      </Reveal>
    </section>
  )
}
