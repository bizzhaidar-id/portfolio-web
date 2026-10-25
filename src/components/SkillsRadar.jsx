import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'

// Loaded lazily from Skills.jsx so recharts stays out of the initial bundle.
export default function SkillsRadar({ data, dark }) {
  const grid = dark ? '#41494d' : '#c9cccd'
  const text = dark ? '#c9cccd' : '#41494d'
  const fill = dark ? '#a6bcc4' : '#5b7586'

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} outerRadius="62%" margin={{ top: 10, right: 50, bottom: 10, left: 50 }}>
        <PolarGrid stroke={grid} />
        <PolarAngleAxis dataKey="skill" tick={{ fill: text, fontSize: 12, fontWeight: 500 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar dataKey="value" stroke={fill} strokeWidth={2} fill={fill} fillOpacity={dark ? 0.35 : 0.25} />
        <Tooltip
          contentStyle={{
            background: dark ? '#1d2428' : '#ffffff',
            border: `1px solid ${grid}`,
            borderRadius: 8,
            color: text,
          }}
          formatter={(v) => [`${v}/100`]}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
