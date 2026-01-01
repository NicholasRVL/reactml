# 🎬 Scroll Animation - Hero Section Implementation

Dokumentasi lengkap untuk implementasi animasi scroll yang smooth pada hero section dengan fade-out/scale-down pada hero dan fade-in pada content sections.

---

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Fitur Utama](#fitur-utama)
3. [Struktur File](#struktur-file)
4. [Cara Kerja Animasi](#cara-kerja-animasi)
5. [Implementasi React](#implementasi-react)
6. [Implementasi Vanilla JS](#implementasi-vanilla-js)
7. [Tips Performa](#tips-performa)
8. [Browser Support](#browser-support)
9. [Responsive Design](#responsive-design)

---

## 🎯 Overview

Solusi lengkap untuk membuat scroll animation yang responsive dan smooth dengan:

- ✅ **Hero Fade-Out**: Gambar mobil fades out + scales down saat user scroll down
- ✅ **Hero Fade-In**: Gambar mobil fades in + scales up saat user scroll up
- ✅ **Content Fade-In**: Konten sections fade in secara bertahap saat scroll
- ✅ **60 FPS Smooth**: Menggunakan requestAnimationFrame untuk smooth animation
- ✅ **GPU Accelerated**: Transform dan opacity untuk performa optimal
- ✅ **Fully Responsive**: Bekerja di semua ukuran device
- ✅ **Accessibility Ready**: Respects prefers-reduced-motion

---

## ✨ Fitur Utama

### Animasi Hero Section
```
Scroll Progress: 0% ────────→ 5% ───────→ 65% ────────→ 100%
Opacity:        1.0  ────────→ 1.0 ────→ 0.0 ────────→ 0.0
Scale:          1.0  ────────→ 1.0 ────→ 0.7 ────────→ 0.7
TranslateY:     0px  ────────→ 0px ────→ -80px ──────→ -80px
```

### Scroll Indicator
- Bounce animation yang indah saat hero visible
- Fade out bersama dengan hero section
- Responsive dengan mobile devices

### Content Sections
- Fade in dari opacity 0 menjadi 1
- Slide up dari translateY(30px) menjadi 0
- Smooth transition dengan cubic-bezier easing

---

## 📁 Struktur File

```
src/
├── components/
│   ├── HeroWithCar.jsx          ← Main hero component dengan scroll animation
│   ├── Home.jsx                 ← Home page yang sync hero & content animations
│   ├── PredictionPanel.jsx
│   ├── HowItWorks.jsx
│   └── ModelStats.jsx
├── hooks/
│   └── useScrollAnimation.js     ← Custom hooks untuk scroll animations
├── styles/
│   └── theme.css               ← Global theme & animations
├── docs/
│   └── SCROLL_ANIMATION_GUIDE.js ← Dokumentasi lengkap
├── examples/
│   └── scroll-animation-standalone.html ← Contoh vanilla JS
└── App.jsx
```

---

## 🧠 Cara Kerja Animasi

### 1. Scroll Progress Calculation

```javascript
const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
```

- `elementTop`: Jarak dari atas viewport ke element
- `windowHeight`: Tinggi viewport
- `elementHeight`: Tinggi element
- **Result**: Normalized value 0-1 yang merepresentasikan posisi element

### 2. Fade-Out Trigger

```javascript
const fadeOut = Math.max(0, Math.min(1, (clampedProgress - 0.05) / 0.6))
```

- Fade-out **dimulai** saat progress mencapai 5% (element masih agak di atas tengah)
- Fade-out **selesai** saat progress mencapai 65% (element sudah keluar dari viewport)
- **Range**: 0.6 (60% dari total scroll range)

### 3. Transformasi Nilai

```javascript
const opacity = Math.max(0, 1 - fadeOut)     // 1 → 0
const scale = 1 - (fadeOut * 0.3)            // 1 → 0.7 (scale down 30%)
const translateY = fadeOut * -80              // 0 → -80px (move up)
```

### 4. CSS Transition

```javascript
transition: opacity 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

- `0.12s`: Mengikuti refresh rate browser (~60fps = 16.67ms per frame)
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)`: Ease-out curve untuk natural motion

---

## 🔧 Implementasi React

### HeroWithCar.jsx (Main Component)

```javascript
import React, { useEffect, useRef, useState } from 'react'

export default function HeroWithCar() {
  const heroRef = useRef(null)
  
  const [carState, setCarState] = useState({
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
          if (!heroRef.current) return

          const rect = heroRef.current.getBoundingClientRect()
          const elementTop = rect.top
          const elementHeight = rect.height
          const windowHeight = window.innerHeight

          // Calculate scroll progress
          const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
          
          // Fade-out dari 5% hingga 65% progress
          const fadeOut = Math.max(0, Math.min(1, (clampedProgress - 0.05) / 0.6))
          
          // Update state dengan transformasi
          setCarState({
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
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section ref={heroRef}>
      <div
        style={{
          opacity: carState.opacity,
          transform: `scale(${carState.scale}) translateY(${carState.translateY}px)`,
          transition: 'opacity 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center center',
        }}
      >
        {/* Hero content */}
      </div>
    </section>
  )
}
```

### Home.jsx (Content Sync)

```javascript
import React, { useEffect, useRef } from 'react'

export default function Home() {
  const contentRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let animationFrameId = null

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(() => {
          if (!contentRef.current) return

          const sections = contentRef.current.querySelectorAll('[data-scroll-section]')

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect()
            const elementTop = rect.top
            const elementHeight = rect.height
            const windowHeight = window.innerHeight

            // Calculate fade-in progress
            const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
            const fadeIn = Math.max(0, Math.min(1, (clampedProgress - 0.05) / 0.6))

            // Update section styles
            section.style.opacity = fadeIn
            section.style.transform = `translateY(${(1 - fadeIn) * 30}px)`
            section.style.transition = 'opacity 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          })

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div>
      <HeroWithCar />
      
      <main ref={contentRef}>
        <div data-scroll-section>
          <PredictionPanel />
        </div>
        <div data-scroll-section>
          <HowItWorks />
        </div>
        <div data-scroll-section>
          <ModelStats />
        </div>
      </main>
    </div>
  )
}
```

---

## 💻 Implementasi Vanilla JS

Lihat file `examples/scroll-animation-standalone.html` untuk implementasi lengkap dengan:

```javascript
class HeroScrollAnimation {
  constructor(heroElement, contentSelector) {
    this.heroSection = heroElement
    this.heroWrapper = heroElement.querySelector('.hero-wrapper')
    this.contentSections = document.querySelectorAll(contentSelector)
    
    this.state = {
      ticking: false,
      animationFrameId: null,
    }
    
    this.init()
  }

  handleScroll() {
    if (!this.state.ticking) {
      this.state.animationFrameId = requestAnimationFrame(() => {
        this.updateHeroAnimation()
        this.updateContentAnimation()
        this.state.ticking = false
      })
      this.state.ticking = true
    }
  }

  updateHeroAnimation() {
    // Hero animation logic
  }

  updateContentAnimation() {
    // Content animation logic
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
    if (this.state.animationFrameId) {
      cancelAnimationFrame(this.state.animationFrameId)
    }
  }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
  const animation = new HeroScrollAnimation(
    document.getElementById('heroSection'),
    '[data-scroll-section]'
  )
})
```

---

## ⚡ Tips Performa

### 1. RequestAnimationFrame Pattern

```javascript
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Perform calculations
      ticking = false
    })
    ticking = true
  }
}

window.addEventListener('scroll', handleScroll, { passive: true })
```

✅ **Keuntungan:**
- Auto-throttle ke refresh rate browser
- Smooth 60fps animation
- Menghindari jank dari excessive recalculations

### 2. Gunakan GPU Properties

✅ **Optimal** (GPU accelerated):
```css
transform: scale() translateY()
opacity: 0.5
```

❌ **Avoid** (CPU heavy):
```css
top, left, width, height
margin, padding
background-color
```

### 3. will-change & contain

```css
.animated-element {
  will-change: opacity, transform;
  contain: layout style paint;
}
```

### 4. Batch DOM Updates

```javascript
// Batch updates dalam satu requestAnimationFrame
sections.forEach((section) => {
  section.style.opacity = fadeIn
  section.style.transform = `translateY(${offsetY}px)`
})
```

### 5. Passive Event Listeners

```javascript
// Allows browser to optimize scroll behavior
window.addEventListener('scroll', handler, { passive: true })
```

---

## 🌐 Browser Support

| Feature | IE | Edge | Chrome | Firefox | Safari |
|---------|----|----|--------|---------|--------|
| requestAnimationFrame | 10+ | ✅ | ✅ | ✅ | ✅ |
| CSS transforms | 9+ | ✅ | ✅ | ✅ | ✅ |
| CSS transitions | 10+ | ✅ | ✅ | ✅ | ✅ |
| IntersectionObserver | ❌ | 16+ | 51+ | 55+ | 12.1+ |
| Passive listeners | ❌ | ✅ | 51+ | 65+ | 10+ |

**Polyfills needed untuk IE9:**
- CSS transforms (minimal)
- CSS transitions (fallback ke direct DOM manipulation)

---

## 📱 Responsive Design

### Mobile Adjustments

```javascript
// Detect mobile
const isMobile = window.innerWidth <= 768

// Adjust animation ranges for mobile
const fadeOutRange = isMobile ? 0.5 : 0.6

// Reduce animation intensity on mobile
const scaleReduction = isMobile ? 0.2 : 0.3
const moveDistance = isMobile ? -40 : -80
```

### CSS Media Queries

```css
@media (max-width: 768px) {
  .hero-wrapper {
    padding: 1rem;
  }

  @keyframes heroFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(15px); }  /* Reduced from 30px */
  }
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚀 Performance Checklist

- [x] Gunakan requestAnimationFrame untuk scroll handler
- [x] Gunakan passive: true untuk event listener
- [x] GPU accelerate dengan transform + opacity
- [x] Batch DOM updates dalam satu animation frame
- [x] Setup will-change untuk animated elements
- [x] Cleanup event listeners di useEffect return
- [x] Cancel pending animation frames
- [x] Optimize for mobile dengan reduce animation intensity
- [x] Support prefers-reduced-motion untuk accessibility
- [x] Lazy load non-critical images

---

## 📚 File References

- **Main Implementation**: `src/components/HeroWithCar.jsx`, `src/components/Home.jsx`
- **Custom Hooks**: `src/hooks/useScrollAnimation.js`
- **Styles**: `src/styles/theme.css`
- **Documentation**: `src/docs/SCROLL_ANIMATION_GUIDE.js`
- **Standalone Example**: `src/examples/scroll-animation-standalone.html`

---

## 🎓 Konsep Kunci

1. **Scroll Progress**: Normalized 0-1 value representasi element position
2. **Fade-Out Range**: 5%-65% trigger range untuk smooth effect
3. **CSS Easing**: cubic-bezier curve untuk natural motion
4. **GPU Acceleration**: transform & opacity untuk best performa
5. **requestAnimationFrame**: Sync calculations dengan browser refresh rate
6. **Responsive**: Adjust animation intensity based on device size

---

## 💡 Tips Troubleshooting

**Animation terasa jank/laggy?**
- Pastikan passive: true di event listener
- Check akan expensive calculations di scroll handler
- Gunakan Chrome DevTools Performance tab untuk profile

**Animation tidak smooth?**
- Verify requestAnimationFrame digunakan
- Check CSS transition timing (should be ~0.12s atau less)
- Ensure will-change diset di CSS

**Tidak responsive di mobile?**
- Check media queries di theme.css
- Adjust animation ranges untuk mobile
- Test di actual device, bukan Chrome DevTools emulator saja

**Content tidak muncul?**
- Verify data-scroll-section attribute di HTML
- Check z-index layering
- Ensure overflow-x: hidden di container

---

## 📞 Support & Questions

Untuk pertanyaan atau issues, lihat komentar di:
- `HeroWithCar.jsx` - Penjelasan scroll calculation
- `Home.jsx` - Content sync logic
- `useScrollAnimation.js` - Hook implementation
- `SCROLL_ANIMATION_GUIDE.js` - Comprehensive documentation

---

**Last Updated**: December 11, 2025
**Version**: 1.0
**Status**: ✅ Production Ready
