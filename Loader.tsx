import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dur = reduce ? 250 : 1700, t0 = performance.now()
    let raf = 0, to = 0
    const tick = (t: number) => {
      const k = Math.min((t - t0) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100))
      if (k < 1) raf = requestAnimationFrame(tick); else to = window.setTimeout(onDone, reduce ? 0 : 280)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(to) }
  }, [onDone])
  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 sm:p-10" exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} role="status" aria-label="Loading">
      <div className="eyebrow">Portfolio · 2026</div>
      <div className="overflow-hidden">
        <motion.div className="font-sans text-[clamp(3rem,13vw,10rem)] font-semibold leading-[.9] tracking-tight text-fade" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 0.8, 0.2, 1] }}>
          Jinit<br /><span className="font-serif font-normal italic text-accent">Gandhi</span>
        </motion.div>
      </div>
      <div className="flex items-end justify-between">
        <div className="h-px flex-1 overflow-hidden bg-line/10"><motion.div className="h-px origin-left bg-accent" style={{ scaleX: n / 100 }} /></div>
        <div className="ml-6 font-mono text-sm tabular-nums text-muted">{String(n).padStart(3, '0')}</div>
      </div>
    </motion.div>
  )
}
