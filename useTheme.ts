import { useCallback, useEffect, useState } from 'react'
type Theme = 'dark' | 'light'
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.classList.contains('light') ? 'light' : 'dark'))
  useEffect(() => {
    document.documentElement.className = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#fbfbfd' : '#08080a')
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
