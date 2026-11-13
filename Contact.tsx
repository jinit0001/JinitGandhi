import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Download, Mail } from 'lucide-react'
import { useState } from 'react'
import { site } from '../config/site'
import { Magnetic } from './Magnetic'
import { Reveal, SplitWords } from './Reveal'

const Github = ({ size = 17 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>)
const Linkedin = ({ size = 17 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>)

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(site.links.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = 'mailto:' + site.links.email } }
  return (
    <section id="contact" className="section overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />
      <div className="container-x relative">
        <Reveal><p className="eyebrow mb-4">07 — Contact</p></Reveal>
        <SplitWords text="Have an *idea?* Let’s make it *happen.*" className="max-w-4xl text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[.98] tracking-[-0.035em] text-fade" />
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Magnetic><a className="btn btn-primary" href={'mailto:' + site.links.email}><Mail size={17} />{site.links.email}</a></Magnetic>
            <button onClick={copy} className="btn btn-ghost" aria-label="Copy email address">
              <AnimatePresence mode="wait" initial={false}><motion.span key={String(copied)} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.18 }}>{copied ? <Check size={17} /> : <Copy size={17} />}</motion.span></AnimatePresence>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Magnetic><a className="btn btn-ghost" href={site.links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} />LinkedIn</a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={site.links.github} target="_blank" rel="noopener noreferrer"><Github size={17} />GitHub</a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={site.links.resume} download><Download size={17} />Download resume</a></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
