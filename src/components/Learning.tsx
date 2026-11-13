import { motion } from 'framer-motion'
import { BadgeCheck, Plus } from 'lucide-react'
import { learning } from '../config/site'
import { Reveal, SplitWords } from './Reveal'

export function Learning() {
  return (
    <section id="learning" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow mb-4">06 — Certifications &amp; Learning</p></Reveal>
        <SplitWords text="Always learning." className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl" />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {learning.map((l, i) => (
            <motion.article key={l.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -60px 0px' }} transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.22, 0.8, 0.2, 1] }} whileHover={{ y: -6 }} className="glass group relative overflow-hidden rounded-3xl p-8">
              <div className={'absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100 ' + (l.simulation ? 'bg-warm/20 opacity-40' : 'bg-accent/20 opacity-40')} />
              <div className="relative">
                <span className={'chip ' + (l.simulation ? 'border-warm/40 text-warm' : 'border-accent/40 text-accent')}><BadgeCheck size={14} />{l.label}</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{l.title}</h3>
                <p className="mt-1 text-sm text-muted">{l.org}</p>
                <p className="mt-4 leading-relaxed text-fg/80">{l.text}</p>
              </div>
            </motion.article>
          ))}
          <Reveal className="md:col-span-2">
            <div className="flex items-center gap-4 rounded-3xl border border-dashed border-line/20 p-6 text-muted"><Plus size={18} /> More certifications will be added here as I complete them.</div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
