import { useEffect } from 'react'

export default function useFadeOnScroll(selector = '.fade-in') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector))

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('show'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target) 
          }
        })
      },
      { threshold: 0.12 }
    )

    elements.forEach(el => {
      if (!el.classList.contains('show')) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  })
}
