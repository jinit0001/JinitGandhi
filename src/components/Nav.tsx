import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { site } from '../config/site'
import { scrollToId } from '../lib/scroll'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = site.nav.map((n) => n.id)

export function Nav({ theme, toggle }: { theme: 'dark' | 'light'; toggle: () => void }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 350 : 0) }
  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav aria-label="Main" className="glass flex w-full max-w-[860px] items-center justify-between rounded-full py-2 pl-5 pr-2 shadow-[0_8px_40px_rgb(0_0_0/.18)]">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 font-medium tracking-tight" aria-label="Jinit Gandhi, back to top">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-fg text-[13px] font-semibold text-bg">J</span>
            <span className="hidden sm:inline">Jinit Gandhi</span>
          </a>
          <ul className="hidden items-center md:flex">
            {site.nav.map((n) => (
              <li key={n.id}>
                <a href={'#' + n.id} onClick={(e) => { e.preventDefault(); scrollToId(n.id) }} className={'relative block rounded-full px-3.5 py-2 text-sm transition-colors ' + (active === n.id ? 'text-fg' : 'text-muted hover:text-fg')}>
                  {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <button onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.25 }}>
                  {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button onClick={() => go('contact')} className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-white sm:block">Let’s talk</button>
            <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="grid h-9 w-9 place-items-center rounded-full text-fg md:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 bg-bg/95 px-8 pt-28 backdrop-blur-xl md:hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            <ul className="space-y-2">
              {site.nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <button onClick={() => go(n.id)} className="flex w-full items-baseline gap-4 py-2 text-left text-4xl font-semibold tracking-tight">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>{n.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
