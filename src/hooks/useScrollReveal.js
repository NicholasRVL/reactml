import { useEffect, useRef } from 'react';

export default function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 } 
    );

    const sections = containerRef.current.querySelectorAll('[data-scroll-section]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}