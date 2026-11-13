import { motion } from 'framer-motion'

const bars = [38, 64, 46, 80, 58, 92, 52]

/** Original, code-drawn previews for each project (no stock images needed). */
export function ProjectVisual({ id, className = '' }: { id: string; className?: string }) {
  return (
    <div className={'relative h-full w-full overflow-hidden ' + className} aria-hidden>
      <div className="absolute inset-0 grid-bg opacity-70" />
      {id === 'keymood-ai' && <Keys />}
      {id === 'unidex' && <Dash />}
      {id === 'logistics-risk' && <Risk />}
      {id === 'opentrace' && <Radar />}
    </div>
  )
}

function Keys() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="absolute h-[70%] w-[70%] rounded-full bg-accent/25 blur-[90px]" />
      <div className="relative w-[82%] max-w-[560px]">
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div key={i} className="aspect-square rounded-lg border border-line/15 bg-card/[.06]" animate={{ y: [0, -6, 0], backgroundColor: ['rgb(var(--card) / .06)', 'rgb(var(--accent) / .55)', 'rgb(var(--card) / .06)'] }} transition={{ duration: 3.2, repeat: Infinity, delay: ((i * 7) % 12) * 0.22, ease: 'easeInOut' }} />
          ))}
        </div>
        <svg viewBox="0 0 400 70" className="mt-6 w-full" fill="none"><motion.path d="M0 36 C 30 6, 50 66, 80 36 S 130 6, 160 36 S 210 66, 240 30 S 300 4, 330 38 S 380 60, 400 34" stroke="rgb(var(--accent))" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} /></svg>
        <div className="mt-3 flex flex-wrap gap-2">{['calm', 'focused', 'stressed', 'tired', 'happy'].map((e, i) => <motion.span key={e} className="chip" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 5, repeat: Infinity, delay: i * 1 }}>{e}</motion.span>)}</div>
      </div>
    </div>
  )
}

function Dash() {
  const rows = [['CLM-1042', 'Approved', 78], ['CLM-1043', 'In review', 46], ['CLM-1044', 'Documents', 24], ['CLM-1045', 'Reported', 92]] as const
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="absolute h-[60%] w-[60%] rounded-full bg-warm/15 blur-[90px]" />
      <div className="glass relative w-[86%] max-w-[520px] rounded-2xl p-4 shadow-2xl">
        <div className="mb-3 flex gap-1.5"><i className="h-2 w-2 rounded-full bg-line/30" /><i className="h-2 w-2 rounded-full bg-line/30" /><i className="h-2 w-2 rounded-full bg-line/30" /></div>
        <div className="flex h-20 items-end gap-2">{bars.map((b, i) => <motion.div key={i} className="flex-1 rounded-t-md bg-accent/70" initial={{ height: 0 }} whileInView={{ height: b + '%' }} viewport={{ once: false }} transition={{ duration: 1, delay: i * 0.08 }} />)}</div>
        <div className="mt-4 space-y-2">{rows.map(([id, st, p], i) => (
          <div key={id} className="flex items-center gap-3 text-[11px]"><span className="w-16 font-mono text-muted">{id}</span><span className="w-16 text-fg/80">{st}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/10"><motion.span className="block h-full rounded-full bg-warm" initial={{ width: 0 }} whileInView={{ width: p + '%' }} viewport={{ once: false }} transition={{ duration: 1.2, delay: 0.3 + i * 0.12 }} /></span></div>
        ))}</div>
      </div>
    </div>
  )
}

function Risk() {
  const cells = [1, 2, 3, 2, 3, 4, 3, 4, 5]
  const col = (v: number) => (v >= 5 ? 'rgb(255 99 99 / .75)' : v >= 4 ? 'rgb(255 170 110 / .65)' : v >= 3 ? 'rgb(255 212 110 / .5)' : 'rgb(var(--accent) / .35)')
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="absolute h-[60%] w-[60%] rounded-full bg-accent/20 blur-[90px]" />
      <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
        {cells.map((v, i) => <motion.div key={i} className="h-14 w-14 rounded-xl border border-line/15 sm:h-[72px] sm:w-[72px]" style={{ background: col(v) }} animate={{ scale: [1, 1.07, 1], opacity: [0.75, 1, 0.75] }} transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }} />)}
        <motion.div className="absolute -right-6 -top-5 h-4 w-4 rounded-full bg-warm shadow-[0_0_30px_rgb(var(--warm))]" animate={{ x: [0, -40, -110, -150], y: [0, 30, 60, 110] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
    </div>
  )
}

function Radar() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="absolute h-[60%] w-[60%] rounded-full bg-accent/20 blur-[90px]" />
      <div className="relative h-[240px] w-[240px] sm:h-[300px] sm:w-[300px]">
        {[1, 0.7, 0.4].map((s) => <div key={s} className="absolute inset-0 m-auto rounded-full border border-line/20" style={{ width: s * 100 + '%', height: s * 100 + '%' }} />)}
        <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}><div className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom bg-gradient-to-t from-accent to-transparent" /><div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_rgb(var(--accent))]" /></motion.div>
        {[[28, 36], [66, 24], [60, 70], [30, 66]].map(([x, y], i) => <motion.span key={i} className="absolute h-2 w-2 rounded-full bg-warm" style={{ left: x + '%', top: y + '%' }} animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }} />)}
        <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-fg" />
      </div>
    </div>
  )
}
