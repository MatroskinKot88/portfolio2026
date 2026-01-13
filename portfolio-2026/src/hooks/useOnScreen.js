// src/hooks/useOnScreen.js
import { useState, useEffect, useRef } from 'react';

export default function useOnScreen(options) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Опционально: отключить наблюдение после первого срабатывания
        if (options?.once !== false) {
          observer.unobserve(entry.target);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}