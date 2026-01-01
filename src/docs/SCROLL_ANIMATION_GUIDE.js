/**
 * DOKUMENTASI ANIMASI SCROLL HERO SECTION
 * ==========================================
 * 
 * Solusi untuk membuat smooth scroll animation pada halaman dengan:
 * - Hero section yang fade-out + scale-down saat scroll down
 * - Hero section yang fade-in + scale-up saat scroll up
 * - Konten sections yang fade-in dengan staggered effect
 * - Performa optimal menggunakan requestAnimationFrame
 * - Responsif di semua device sizes
 * 
 */

// DOKUMENTASI STRUKTUR ANIMASI SCROLL
// Format: Semua contoh kode di komentar untuk referensi saja

// ============================================================================
// 1. PERFORMA TIPS
// ============================================================================

/*
✓ Tips Performa Optimal:
  1. Gunakan requestAnimationFrame untuk smooth 60fps animations
  2. Gunakan passive event listeners untuk scroll
  3. Setkan will-change: opacity, transform untuk GPU acceleration
  4. Throttle/debounce scroll calculations dengan rAF
  5. Hindari DOM repaints dengan batch updates
  6. Lazy load images yang tidak visible di viewport
  7. Gunakan transform dan opacity (GPU properties)
  8. Hindari expensive calculations di scroll handler

✓ Browser Support:
  - requestAnimationFrame: IE10+, semua modern browsers
  - IntersectionObserver: IE tidak supported, perlu polyfill untuk lama
  - CSS transforms: IE9+
  - CSS transitions: IE10+

✓ Responsive Considerations:
  - Use clamp() untuk font sizing
  - Adjust animation ranges pada mobile
  - Test pada device yang berbeda
  - Gunakan media queries untuk breakpoints

✓ Accessibility:
  - Respect prefers-reduced-motion
  - Provide fallback untuk unsupported browsers
  - Ensure keyboard navigation works
  - Test dengan screen readers
*/

// ============================================================================
// 2. ANIMATION LOGIC FORMULA
// ============================================================================

/*
Formula untuk scroll progress calculation:

  const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
  const fadeOut = Math.max(0, Math.min(1, (clampedProgress - 0.05) / 0.6))
  
  Penjelasan:
  - scrollProgress: Normalized value (0-1) dari posisi element terhadap viewport
  - clampedProgress: Membatasi nilai antara 0 dan 1
  - fadeOut: Trigger fade-out dari 5% progress hingga 65%
  
  Transformasi:
  - opacity = Math.max(0, 1 - fadeOut)
  - scale = 1 - (fadeOut * 0.3)  // Scale down 30%
  - translateY = fadeOut * -80   // Move up 80px

CSS Transitions untuk smooth motion:
  transition: opacity 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)
*/

// ============================================================================
// 3. KEY ANIMATIONS CSS (REFERENCE)
// ============================================================================

/*
@keyframes heroFadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(30px);
  }
}

@keyframes heroPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
}

@keyframes heroBounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(12px);
  }
}
*/

// ============================================================================
// 4. REACT HOOK IMPLEMENTATION
// ============================================================================

/*
Hook yang tersedia di useScrollAnimation.js:

1. useScrollAnimation(threshold = 0.2)
   - Menggunakan IntersectionObserver
   - Return: { elementRef, isVisible, scrollProgress }
   - Gunakan untuk fade-in saat element masuk viewport

2. useParallaxScroll()
   - Scroll-based parallax effect
   - Return: { elementRef, state: { opacity, scale, translateY } }
   - State otomatis update saat user scroll

3. useScrollProgress(onProgress)
   - Custom scroll progress dengan callback
   - Return: elementRef
   - onProgress callback menerima progress value (0-1)

Contoh usage:
  const { elementRef, state } = useParallaxScroll()
  
  <div
    ref={elementRef}
    style={{
      opacity: state.opacity,
      transform: `scale(${state.scale}) translateY(${state.translateY}px)`
    }}
  >
    Content
  </div>
*/

// ============================================================================
// 5. OPTIMIZED EVENT HANDLING
// ============================================================================

/*
RequestAnimationFrame Pattern untuk smooth animations:

  let ticking = false
  let animationFrameId = null

  const handleScroll = () => {
    if (!ticking) {
      animationFrameId = requestAnimationFrame(() => {
        // Perform scroll calculations here
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  Keuntungan:
  - Sync dengan refresh rate browser (60fps)
  - Throttle otomatis dengan frame rate
  - Smooth animation tanpa jank
  - Passive listener untuk better scrolling performa
  
  Cleanup:
  - Remove event listener
  - Cancel pending animation frame
  - Clear timeouts jika ada
*/

// ============================================================================
// 6. IMPLEMENTATION CHECKLIST
// ============================================================================

/*
✓ Setup:
  [x] Import useEffect, useRef, useState dari React
  [x] Create ref untuk hero element
  [x] Create state untuk opacity, scale, translateY
  [x] Setup scroll event listener dengan requestAnimationFrame

✓ Animation Logic:
  [x] Calculate scroll progress dari element position
  [x] Clamp progress antara 0-1
  [x] Calculate fadeOut dari 5% hingga 65% range
  [x] Apply transformations ke element style

✓ Content Sections:
  [x] Query all content sections dengan querySelectorAll
  [x] Calculate fade-in progress untuk setiap section
  [x] Update opacity dan transform secara individual
  [x] Apply will-change untuk GPU acceleration

✓ Performance:
  [x] Use requestAnimationFrame untuk smooth updates
  [x] Use passive: true untuk event listener
  [x] Batch DOM updates di satu animation frame
  [x] Cleanup event listeners di useEffect return

✓ Responsiveness:
  [x] Use clamp() CSS untuk responsive sizing
  [x] Adjust animation ranges di media queries
  [x] Test di berbagai screen sizes
  [x] Handle touch devices dengan passive listener

✓ Accessibility:
  [x] Content tetap accessible tanpa JavaScript
  [x] Scroll functionality tidak depend pada animations
  [x] Semantic HTML structure maintained
  [x] Keyboard navigation tetap work
*/

export default {
  documentationVersion: '1.0',
  lastUpdated: new Date().toISOString(),
  guide: 'Animasi scroll untuk Hero section dengan fade-out/scale-down dan konten fade-in',
}
