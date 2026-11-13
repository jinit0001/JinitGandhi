import { motion } from 'framer-motion'
import { about, site } from '../config/site'
import { Reveal, SplitWords } from './Reveal'

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal><p className="eyebrow mb-4">01 — About</p></Reveal>
            <SplitWords text="The person between the idea and the outcome." className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <Reveal><p className="text-2xl font-medium leading-snug tracking-tight text-fg sm:text-[2rem]">{about.statement}</p></Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-10 border-l-2 border-accent pl-6 font-serif text-2xl italic leading-snug text-fg/90 sm:text-3xl">“{site.positioning}”</blockquote>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-line/10 sm:grid-cols-2">
            {about.pillars.map((p, i) => (
              <motion.article key={p.n} className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-card/[.04]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -60px 0px' }} transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 0.8, 0.2, 1] }}>
                <span className="font-mono text-xs text-accent">{p.n}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
