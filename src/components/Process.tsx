import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { process } from '../config/site'
import { Reveal } from './Reveal'

const N = process.length

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const progress = useMotionValue(0)

  // Scroll progress is read straight from the section's position, so it works with
  // native scrolling, smooth scrolling and anchor jumps alike.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const range = Math.max(1, r.height - window.innerHeight)
      const p = Math.min(1, Math.max(0, -r.top / range))
      progress.set(p)
      setActive(Math.min(N - 1, Math.floor(p * N)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [progress])

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / N) * (el.offsetHeight - window.innerHeight)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const step = process[active]
  return (
    <section id="process" ref={ref} className="relative" style={{ height: `${N * 55 + 45}svh`, marginTop: "-12svh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow mb-4">05 — How I Work</p></Reveal>
            <div className="relative h-[170px] sm:h-[300px]">
              <motion.div key={step.n} initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }} className="absolute inset-0">
                <div className="font-mono text-[clamp(4.5rem,16vw,12rem)] font-semibold leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgb(var(--fg) / .28)' }}>{step.n}</div>
                <h3 className="-mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">{step.title}</h3>
              </motion.div>
            </div>
            <motion.p key={step.n + 't'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{step.text}</motion.p>
          </div>
          <ol className="relative space-y-1 lg:col-span-5">
            <div className="absolute bottom-6 left-[11px] top-6 w-px bg-line/10" />
            <motion.div className="absolute bottom-6 left-[11px] top-6 w-px origin-top bg-accent" style={{ scaleY: progress }} />
            {process.map((p, i) => (
              <li key={p.n}>
                <button onClick={() => jump(i)} className="group relative flex w-full items-center gap-5 rounded-2xl py-3 text-left" aria-current={active === i ? 'step' : undefined}>
                  <span className={'relative z-10 grid h-6 w-6 place-items-center rounded-full border font-mono text-[10px] transition-all duration-500 ' + (i <= active ? 'border-accent bg-accent text-white' : 'border-line/25 bg-bg text-muted')}>{i + 1}</span>
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
