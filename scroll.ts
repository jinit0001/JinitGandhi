import type Lenis from 'lenis'
let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => { lenis = l }
export const getLenis = () => lenis
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
