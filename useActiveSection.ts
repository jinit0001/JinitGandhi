import { useEffect, useState } from 'react'
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onTop = () => { if (window.scrollY < 200) setActive('') }
    window.addEventListener('scroll', onTop, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop) }
  }, [ids])
  return active
}
