import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../config/site'
import { getLenis } from '../lib/scroll'

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-accent" style={{ scaleX: x }} />
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(scrollY > 900); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.8 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          onClick={() => { const l = getLenis(); if (l) l.scrollTo(0, { duration: 1.6 }); else scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="Back to top"
          className="glass fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full transition-colors hover:bg-fg hover:text-bg"><ArrowUp size={18} /></motion.button>
      )}
    </AnimatePresence>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line/10 py-10">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} {site.name}. Designed and built by hand.</p>
        <p className="font-mono text-xs">Vadodara · Mumbai</p>
      </div>
    </footer>
  )
}
