import { useTranslation } from 'react-i18next'
import { Briefcase, GraduationCap } from 'lucide-react'
import Reveal from '../components/Reveal'
import { Timeline, TimelineItem } from '../components/Timeline'

function TimelineSection({ id, ns, icon }) {
  const { t } = useTranslation()
  return (
    <section id={id} className="section">
      <Reveal>
        <h2 className="section-title">{t(`${ns}.title`)}</h2>
      </Reveal>
      <Timeline>
        {t(`${ns}.items`).map((item, i) => (
          <TimelineItem
            key={i}
            index={i}
            icon={icon}
            title={item.role}
            subtitle={item.company}
            meta={[item.division, item.location].filter(Boolean).join(' · ')}
            period={item.period}
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-500">
              {item.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  )
}

export function Experience() {
  return <TimelineSection id="experience" ns="experience" icon={Briefcase} />
}

export function Education() {
  return <TimelineSection id="education" ns="education" icon={GraduationCap} />
}
