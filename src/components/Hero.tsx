import { motion, useMotionValue, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { site } from '../config/site'
import { scrollToId } from '../lib/scroll'
import { Magnetic } from './Magnetic'
import { SplitWords } from './Reveal'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]), fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const mx = useMotionValue(50), my = useMotionValue(40)
  const smx = useSpring(mx, { stiffness: 80, damping: 20 }), smy = useSpring(my, { stiffness: 80, damping: 20 })
  const spot = useMotionTemplate`radial-gradient(520px circle at ${smx}% ${smy}%, rgb(var(--accent) / .16), transparent 60%)`
  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden"
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 100); my.set(((e.clientY - r.top) / r.height) * 100) }}>
      {/* subtle animated background */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} />
      <motion.div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]" animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-warm/15 blur-[130px]" animate={{ x: [0, -50, 0], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />

      <motion.div style={{ y, opacity: fade }} className="container-x relative z-10 pb-24 pt-36">
        {ready && (
          <>
            {site.availability.show && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-[13px]">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
                {site.availability.label}
              </motion.div>
            )}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="eyebrow mb-6">{site.name} — {site.roles.join(' · ')}</motion.p>
            <SplitWords as="h1" inView={false} delay={0.2} text={site.headline} className="max-w-[16ch] text-[clamp(2.9rem,8.4vw,7.4rem)] font-semibold leading-[.98] tracking-[-0.035em] text-fade" />
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }} className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{site.intro}</motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9 }} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic><button className="btn btn-primary" onClick={() => scrollToId('projects')}>View my work <ArrowDown size={16} /></button></Magnetic>
              <Magnetic><button className="btn btn-ghost" onClick={() => scrollToId('contact')}>Let’s connect <ArrowUpRight size={16} /></button></Magnetic>
            </motion.div>
          </>
        )}
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="container-x flex items-end justify-between">
          <ul className="hidden gap-6 sm:flex">{site.facts.map((f) => <li key={f} className="eyebrow">{f}</li>)}</ul>
          <button onClick={() => scrollToId('about')} aria-label="Scroll to About" className="group flex items-center gap-3">
            <span className="eyebrow">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-line/15"><motion.span className="absolute inset-x-0 top-0 h-4 bg-fg" animate={{ y: [-16, 44] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} /></span>
          </button>
        </div>
      </div>
    </section>
  )
}
