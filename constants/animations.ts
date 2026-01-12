/**
 * Shared Framer Motion Animation Variants
 * 
 * Reusable animation configurations for consistent motion across the landing page.
 * All animations are optimized for performance and accessibility.
 */

import { Variants } from 'framer-motion';

// Container variants for staggered animations
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Item variants for staggered children
export const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
    },
  },
};

// Fade in variants
export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide up variants
export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Slide down variants
export const slideDownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Slide left variants
export const slideLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Slide right variants
export const slideRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Title animation variants (for section headings)
export const titleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Description animation variants
export const descriptionVariants: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

// Button hover and tap variants
export const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Card hover variants
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Viewport options for scroll-triggered animations
export const viewportOptions = {
  once: true,
  margin: '-100px',
  amount: 0.3,
} as const;

// Stagger delay function for custom delays
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => 
  index * baseDelay;

// Common transition presets
export const transitions = {
  smooth: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  },
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
  gentle: {
    duration: 0.6,
    ease: 'easeOut',
  },
} as const;

