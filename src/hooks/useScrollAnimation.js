import { useEffect, useRef, useState } from 'react'

/**
 * Hook untuk scroll animation dengan IntersectionObserver
 * Smooth scroll-based fade-in/fade-out dan scale animations
 */
export function useScrollAnimation(threshold = 0.2) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // IntersectionObserver untuk mendeteksi ketika element masuk viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold])

  return { elementRef, isVisible }
}

/**
 * Hook untuk animasi parallax/fade pada scroll
 * Menghitung opacity dan scale berdasarkan posisi element di viewport
 */
export function useParallaxScroll() {
  const elementRef = useRef(null)
  const [state, setState] = useState({
    opacity: 1,
    scale: 1,
    translateY: 0,
  })

  useEffect(() => {
    let ticking = false
    let animationFrameId = null

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(() => {
          if (!elementRef.current) return

          const rect = elementRef.current.getBoundingClientRect()
          const elementTop = rect.top
          const elementHeight = rect.height
          const windowHeight = window.innerHeight

          // Hitung progress scroll (0 = centered, 1 = keluar viewport)
          const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

          // Fade-out dimulai dari 5% hingga 65% progress
          const fadeOut = Math.max(0, Math.min(1, (clampedProgress - 0.05) / 0.6))

          setState({
            opacity: Math.max(0, 1 - fadeOut),
            scale: 1 - (fadeOut * 0.3),
            translateY: fadeOut * -80,
          })

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return { elementRef, state }
}

/**
 * Hook untuk custom scroll-based animations dengan callback
 * Memberikan kontrol penuh atas progress perhitungan
 */
export function useScrollProgress(onProgress) {
  const elementRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let animationFrameId = null

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(() => {
          if (!elementRef.current) return

          const rect = elementRef.current.getBoundingClientRect()
          const elementTop = rect.top
          const elementHeight = rect.height
          const windowHeight = window.innerHeight

          // Normalize scroll progress (0-1)
          const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
          const progress = Math.max(0, Math.min(1, scrollProgress))

          onProgress?.(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [onProgress])

  return elementRef
}
