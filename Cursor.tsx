import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Desktop-only cursor follower. The native cursor stays visible, so usability is never affected. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle')
  const [label, setLabel] = useState('')
  const [shown, setShown] = useState(false)
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const dx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 }), dy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 })
  const rx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 }), ry = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 })

  useEffect(() => {
    const ok = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(ok)
    if (!ok) return
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setShown(true) }
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement
      const lab = t.closest('[data-cursor]') as HTMLElement | null
      if (lab) { setMode('label'); setLabel(lab.dataset.cursor || '') }
      else if (t.closest('a,button,[role="button"],input,textarea')) setMode('link')
      else setMode('idle')
    }
    const leave = () => setShown(false)
    addEventListener('pointermove', move, { passive: true }); addEventListener('pointerover', over, { passive: true }); document.documentElement.addEventListener('pointerleave', leave)
    return () => { removeEventListener('pointermove', move); removeEventListener('pointerover', over); document.documentElement.removeEventListener('pointerleave', leave) }
  }, [x, y])

  if (!enabled) return null
  const size = mode === 'label' ? 84 : mode === 'link' ? 56 : 34
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-accent" style={{ x: dx, y: dy, translateX: '-50%', translateY: '-50%', opacity: shown ? 1 : 0 }} />
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[89] grid place-items-center rounded-full border border-fg/40 text-[11px] font-medium text-bg"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', opacity: shown ? 1 : 0 }}
        animate={{ width: size, height: size, backgroundColor: mode === 'label' ? 'rgb(var(--fg) / .92)' : mode === 'link' ? 'rgb(var(--fg) / .08)' : 'rgb(var(--fg) / 0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
        {mode === 'label' && <span>{label}</span>}
      </motion.div>
    </>
  )
}
