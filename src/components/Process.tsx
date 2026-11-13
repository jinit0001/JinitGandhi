import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import { process } from '../config/site'
import { Reveal } from './Reveal'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(process.length - 1, Math.max(0, Math.floor(v * process.length)))))
  const step = process[active]
  return (
    <section id="process" ref={ref} className="relative" style={{ height: `${process.length * 70 + 40}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow mb-4">05 — How I Work</p></Reveal>
            <div className="relative h-[220px] sm:h-[320px]">
              <motion.div key={step.n} initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }} className="absolute inset-0">
                <div className="font-mono text-[clamp(5rem,16vw,12rem)] font-semibold leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgb(var(--fg) / .28)' }}>{step.n}</div>
                <h3 className="-mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">{step.title}</h3>
              </motion.div>
            </div>
            <motion.p key={step.n + 't'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{step.text}</motion.p>
          </div>
          <ol className="relative space-y-1 lg:col-span-5">
            <div className="absolute bottom-2 left-[11px] top-2 w-px bg-line/10" />
            <motion.div className="absolute left-[11px] top-2 w-px origin-top bg-accent" style={{ scaleY: scrollYProgress, bottom: '0.5rem' }} />
            {process.map((p, i) => (
              <li key={p.n}>
                <button onClick={() => { const el = ref.current; if (!el) return; const top = el.offsetTop + (i / process.length) * (el.offsetHeight - innerHeight) + 4; scrollTo({ top, behavior: 'smooth' }) }} className="group relative flex w-full items-center gap-5 rounded-2xl py-3 pl-0 text-left" aria-current={active === i}>
                  <span className={'relative z-10 grid h-6 w-6 place-items-center rounded-full border text-[10px] font-mono transition-all duration-500 ' + (i <= active ? 'border-accent bg-accent text-white' : 'border-line/25 bg-bg text-muted')}>{i + 1}</span>
                  <span className={'text-xl font-medium tracking-tight transition-all duration-500 ' + (i === active ? 'translate-x-1 text-fg' : 'text-muted group-hover:text-fg/80')}>{p.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
