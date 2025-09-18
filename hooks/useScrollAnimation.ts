import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          // Optionally, stop observing once the animation is triggered
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return ref;
};

export default useScrollAnimation;