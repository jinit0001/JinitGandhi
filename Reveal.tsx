import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 0.9, delay, ease: [0.22, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

/** Splits text into words that rise out of a mask. Wrap a word in *asterisks* for serif italic emphasis. */
export function SplitWords({ text, className = '', delay = 0, as: Tag = 'h2', inView = true }: { text: string; className?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' | 'p'; inView?: boolean }) {
  const words = text.split(' ')
  const M = motion[Tag]
  return (
    <M className={className} initial="hidden" {...(inView ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -60px 0px' } } : { animate: 'show' })}
      transition={{ staggerChildren: 0.07, delayChildren: delay }} aria-label={text.replace(/\*/g, '')}>
      {words.map((w, i) => {
        const em = w.startsWith('*') && (w.endsWith('*') || /\*[^\w]*$/.test(w))
        const clean = w.replace(/\*/g, '')
        return (
          <span key={i} className="inline-block overflow-hidden align-top pb-[.14em] -mb-[.14em]" aria-hidden>
            <motion.span className={'inline-block ' + (em ? 'font-serif italic font-normal text-accent' : '')}
              variants={{ hidden: { y: '115%' }, show: { y: 0, transition: { duration: 1, ease: [0.22, 0.8, 0.2, 1] } } }}>
              {clean}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </M>
  )
}
