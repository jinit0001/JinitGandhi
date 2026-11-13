import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { skills } from '../config/site'
import { Reveal, SplitWords } from './Reveal'

export function Skills() {
  const [id, setId] = useState(skills[0].id)
  const group = skills.find((s) => s.id === id)!
  return (
    <section id="skills" className="section pb-[clamp(40px,6vw,80px)]">
      <div className="container-x">
        <Reveal><p className="eyebrow mb-4">04 — Skills &amp; Capabilities</p></Reveal>
        <SplitWords text="What I can genuinely talk through." className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl" />
        <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-muted">Only things I have actually used. Where I am still building a skill, it says so.</p></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4" role="tablist" aria-label="Skill categories" aria-orientation="vertical">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {skills.map((s, i) => (
                <button key={s.id} role="tab" aria-selected={id === s.id} onClick={() => setId(s.id)} className="relative shrink-0 rounded-2xl px-5 py-4 text-left transition-colors hover:bg-card/[.05]">
                  {id === s.id && <motion.span layoutId="skill-tab" className="glass absolute inset-0 -z-10 rounded-2xl" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <span className={'block text-lg font-medium tracking-tight ' + (id === s.id ? 'text-fg' : 'text-muted')}>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-0 lg:col-span-8 lg:min-h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div key={group.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                <p className="mb-6 text-xl text-fg/85">{group.blurb}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {group.items.map((it, i) => (
                    <motion.li key={it.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
                      whileHover={{ y: -4 }} className="glass group flex items-center justify-between gap-3 rounded-2xl px-5 py-4 transition-colors hover:border-accent/40">
                      <span><span className="block font-medium">{it.name}</span>{it.note && <span className="text-sm text-muted">{it.note}</span>}</span>
                      {it.learning ? <span className="chip border-warm/40 text-warm">Learning</span> : <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-[2.5]" />}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
