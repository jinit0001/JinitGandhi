import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../config/site'
import { getLenis } from '../lib/scroll'
import { ProjectVisual } from './ProjectVisual'

function Acc({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-line/10">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between py-5 text-left text-lg font-medium tracking-tight">
        {title}<ChevronDown className={'text-muted transition-transform duration-500 ' + (open ? 'rotate-180' : '')} size={20} />
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }} className="overflow-hidden"><div className="pb-6 leading-relaxed text-muted">{children}</div></motion.div>}
      </AnimatePresence>
    </div>
  )
}

export function ProjectModal({ project, onClose, onSwitch }: { project: Project | null; onClose: () => void; onSwitch: (p: Project) => void }) {
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!project) return
    getLenis()?.stop(); document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', key)
    scroller.current?.focus()
    return () => { getLenis()?.start(); document.body.style.overflow = ''; removeEventListener('keydown', key) }
  }, [project, onClose])
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }) }, [project?.id])
  const next = project ? projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length] : null
  return (
    <AnimatePresence>
      {project && next && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} role="dialog" aria-modal="true" aria-label={project.title}>
          <motion.div className="absolute inset-0 bg-bg/70 backdrop-blur-xl" onClick={onClose} />
          <motion.div ref={scroller} tabIndex={-1} data-lenis-prevent className="relative max-h-[94svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[32px] border border-line/10 bg-bg shadow-[0_40px_120px_rgb(0_0_0/.5)] outline-none sm:rounded-[32px]"
            initial={{ y: '100%', scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 220, damping: 30 }}>
            <button onClick={onClose} aria-label="Close" className="glass sticky left-[calc(100%-3.5rem)] top-4 z-20 float-right mr-4 mt-4 grid h-10 w-10 place-items-center rounded-full transition-transform hover:rotate-90"><X size={18} /></button>
            <div className="relative h-[280px] sm:h-[400px]"><ProjectVisual id={project.id} /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" /></div>
            <div className="px-6 pb-10 pt-4 sm:px-12">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="eyebrow">{project.index} — {project.kicker}</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/85">{project.overview}</motion.p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div><p className="eyebrow mb-1">Year</p><p>{project.year}</p></div>
                {project.role && <div className="max-w-md"><p className="eyebrow mb-1">My role</p><p className="text-fg/85">{project.role}</p></div>}
              </div>
              {project.tools && <div className="mt-6 flex flex-wrap gap-2">{project.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div>}
              <div className="mt-10 border-b border-line/10">
                {project.problem && <Acc title="Problem statement" defaultOpen>{project.problem}</Acc>}
                {project.approach && <Acc title="Approach" defaultOpen>{project.approach}</Acc>}
                {project.contributions && <Acc title="Key contributions"><ul className="space-y-3">{project.contributions.map((c) => <li key={c} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{c}</li>)}</ul></Acc>}
                {project.learned && <Acc title="What I learned">{project.learned}</Acc>}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                {project.link ? <a className="btn btn-ghost" href={project.link.href} target="_blank" rel="noopener noreferrer">{project.link.label} <ArrowUpRight size={16} /></a> : <span />}
                <button onClick={() => onSwitch(next)} className="group flex items-center gap-3 text-left"><span><span className="eyebrow block">Next project</span><span className="font-medium">{next.title}</span></span><span className="grid h-10 w-10 place-items-center rounded-full bg-fg text-bg transition-transform group-hover:translate-x-1"><ArrowRight size={18} /></span></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
