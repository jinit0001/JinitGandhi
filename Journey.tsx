import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { journey, journeyFilters, type JourneyItem, type Tag } from '../config/site'
import { Reveal, SplitWords } from './Reveal'

const kindStyle: Record<JourneyItem['kind'], string> = {
  'Virtual job simulation': 'border-warm/40 bg-warm/10 text-warm',
  'Academic project': 'border-accent/40 bg-accent/10 text-accent',
  Education: 'border-line/20 text-muted',
  Certification: 'border-line/20 text-muted',
}

export function Journey() {
  const [filter, setFilter] = useState<'All' | Tag>('All')
  const [open, setOpen] = useState<string | null>(journey[0].title)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const items = journey.filter((j) => filter === 'All' || j.tags.includes(filter as Tag))
  return (
    <section id="journey" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow mb-4">02 — Experience &amp; Journey</p></Reveal>
        <SplitWords text="Where I have actually done the work." className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted">A mix of academic projects and virtual job simulations. To keep it honest, every item is labelled with what it is, and <span className="text-fg">simulations are never presented as employment.</span></p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter journey">
            {journeyFilters.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg aria-selected:text-bg">
                {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className={'relative ' + (filter === f ? 'text-bg' : '')}>{f === 'Simulation' ? 'Simulations' : f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div ref={ref} className="relative mt-14 pl-8 sm:pl-14">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line/10 sm:left-[15px]" />
          <motion.div className="absolute left-[7px] top-2 w-px origin-top bg-accent sm:left-[15px]" style={{ scaleY: line, bottom: 0 }} />
          <motion.ul layout className="space-y-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((j) => {
                const isOpen = open === j.title
                return (
                  <motion.li key={j.title} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }} className="relative">
                    <span className={'absolute -left-[31px] top-7 h-3.5 w-3.5 rounded-full border-2 border-bg sm:-left-[47px] ' + (j.kind === 'Virtual job simulation' ? 'bg-warm' : 'bg-accent')} />
                    <div className="glass overflow-hidden rounded-3xl">
                      <button onClick={() => setOpen(isOpen ? null : j.title)} aria-expanded={isOpen} disabled={!j.details} className="flex w-full items-start justify-between gap-6 p-6 text-left sm:p-8 disabled:cursor-default">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-xs text-muted">{j.when}</span>
                            <span className={'rounded-full border px-2.5 py-0.5 text-[11px] font-medium ' + kindStyle[j.kind]}>{j.kind}</span>
                          </div>
                          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{j.title}</h3>
                          <p className="mt-1 text-sm text-muted">{j.org}</p>
                          <p className="mt-4 max-w-2xl leading-relaxed text-fg/80">{j.summary}</p>
                        </div>
                        {j.details && <ChevronDown className={'mt-2 shrink-0 text-muted transition-transform duration-500 ' + (isOpen ? 'rotate-180' : '')} />}
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && j.details && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}>
                            <ul className="space-y-3 border-t border-line/10 px-6 py-6 sm:px-8">
                              {j.details.map((d) => <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-muted"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{d}</li>)}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
