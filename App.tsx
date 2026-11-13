import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { BackToTop, Footer, ProgressBar } from './components/Chrome'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Learning } from './components/Learning'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { ProjectModal } from './components/ProjectModal'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { projects, type Project } from './config/site'
import { useTheme } from './hooks/useTheme'
import { prefersReducedMotion, setLenis } from './lib/scroll'

export default function App() {
  const { theme, toggle } = useTheme()
  const [loading, setLoading] = useState(() => { try { return sessionStorage.getItem('loaded') !== '1' } catch { return true } })
  const [selected, setSelected] = useState<Project | null>(null)
  const done = useCallback(() => { setLoading(false); try { sessionStorage.setItem('loaded', '1') } catch { /* ignore */ } }, [])

  // smooth scrolling (disabled for reduced-motion users)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const l = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    setLenis(l)
    let raf = 0
    const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); l.destroy(); setLenis(null) }
  }, [])

  // deep link: #project/<id>
  const open = useCallback((p: Project | null) => { setSelected(p); const h = p ? '#project/' + p.id : location.pathname + location.search; history.replaceState(null, '', p ? h : location.pathname + location.search) }, [])
  useEffect(() => { const m = location.hash.match(/^#project\/(.+)$/); if (m) setSelected(projects.find((p) => p.id === m[1]) ?? null) }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise">
        <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
        <ProgressBar />
        <Cursor />
        <Nav theme={theme} toggle={toggle} />
        <main>
          <Hero ready={!loading} />
          <About />
          <Journey />
          <Projects onOpen={open} />
          <Skills />
          <Process />
          <Learning />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <ProjectModal project={selected} onClose={() => open(null)} onSwitch={(p) => open(p)} />
      </div>
    </MotionConfig>
  )
}
