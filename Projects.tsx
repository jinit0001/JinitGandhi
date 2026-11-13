import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../config/site'
import { ProjectVisual } from './ProjectVisual'
import { Reveal, SplitWords } from './Reveal'

const span = ['lg:col-span-12', 'lg:col-span-7', 'lg:col-span-5', 'lg:col-span-12']
const tall = ['h-[300px] sm:h-[440px]', 'h-[260px] sm:h-[340px]', 'h-[260px] sm:h-[340px]', 'h-[240px] sm:h-[320px]']

export function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow mb-4">03 — Projects</p></Reveal>
        <SplitWords text="Selected work, told as stories." className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl" />
        <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-muted">Each project opens into the full picture: the problem, my role, the approach and what I took away from it.</p></Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {projects.map((p, i) => (
            <motion.button key={p.id} data-cursor="View" onClick={() => onOpen(p)} aria-label={`Open project: ${p.title}`}
              className={'group glass relative overflow-hidden rounded-[28px] text-left transition-colors duration-500 hover:border-line/25 ' + span[i % span.length]}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }} whileHover={{ y: -6 }}>
              <div className={'relative ' + tall[i % tall.length]}>
                <motion.div className="h-full w-full" whileHover={{ scale: 1.04 }} transition={{ duration: 1.2, ease: [0.22, 0.8, 0.2, 1] }}><ProjectVisual id={p.id} /></motion.div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/70 to-transparent" />
                <span className="absolute left-6 top-6 font-mono text-xs text-muted">{p.index}</span>
                <span className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-line/20 bg-bg/40 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:bg-fg group-hover:text-bg"><ArrowUpRight size={18} /></span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="eyebrow mb-2">{p.kicker}</p>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{p.short}</p>
                <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
