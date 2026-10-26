// Dummy data for the Daily Checker demo. Every delivery, vessel, shipping point and terminal here is
// invented; nothing comes from a real outstanding list.

const PORTS = [
  'Jebel Ali, UAE',
  'Busan, South Korea',
  'Rotterdam, Netherlands',
  'Durban, South Africa',
  'Manila, Philippines',
  'Ho Chi Minh, Vietnam',
  'Sydney, Australia',
  'Chennai, India',
  'Port Klang, Malaysia',
  'Santos, Brazil',
]
const VESSELS = [
  ['MV NORTHERN STAR', '112N', 'T1'],
  ['MV BLUE HORIZON', '045S', 'T2'],
  ['MV CORAL BAY', '208E', 'T1'],
  ['MV SILVER TIDE', '317W', 'T3'],
  ['MV GOLDEN REEF', '076N', 'T2'],
]
const SPS = ['SP-01', 'SP-02', 'SP-03', 'SP-04', 'SP-05']

// Small seeded generator so the sample is identical on every load.
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

const pad = (n) => String(n).padStart(2, '0')
const day = (d) => `2026-11-${pad(d)}`

export const OUTSTANDING = (() => {
  const r = rng(42)
  return Array.from({ length: 40 }, (_, i) => {
    const v = Math.floor(r() * VESSELS.length)
    const [vessel, voyage, terminal] = VESSELS[v]
    const etd = 4 + v * 3 + Math.floor(r() * 2)
    const c40 = Math.floor(r() * 4)
    const c20 = c40 ? Math.floor(r() * 2) : 1 + Math.floor(r() * 3)
    const hc = Math.floor(r() * 2)
    return {
      delivery: `D9000${String(10101 + i * 7)}`,
      etd: day(etd),
      mad: day(etd - 3),
      sp: SPS[Math.floor(r() * SPS.length)],
      destination: PORTS[Math.floor(r() * PORTS.length)],
      vessel,
      voyage,
      terminal,
      open: `${day(etd - 4)} 08:00`,
      closing: `${day(etd - 1)} 18:00`,
      c20,
      c40,
      hc,
      nw: Math.round((c20 * 18 + (c40 + hc) * 24.5) * (0.85 + r() * 0.15) * 10) / 10,
    }
  })
})()

// The plan covers most deliveries on the next three vessels, plus two entries that match nothing.
export const SAMPLE_PLAN = [
  ...OUTSTANDING.filter((d, i) => d.etd <= day(14) && i % 6 !== 3).map((d) => d.delivery),
  'D900099901',
  'D900099950',
].join('\n')

export const DELIVERY_RE = /D9\d{8}/gi
