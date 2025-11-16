/**
 * Glimmora Hotel - Framer Motion Animation Utilities
 * Premium animation configurations for smooth, professional interactions
 */

import { Variants } from 'framer-motion';

// Fade in from bottom
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Fade in with scale
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Stagger container for children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Fade in
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8
    }
  }
};

// Float animation
export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Hover scale
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
};

// Hover lift
export const hoverLift = {
  whileHover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Smooth reveal (used for in-view animations)
export const smoothReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Card hover effect
export const cardHover = {
  whileHover: {
    y: -12,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 }
  }
};

// Button hover effect
export const buttonHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.98 }
};

// Icon rotate on hover
export const iconRotate = {
  whileHover: {
    rotate: 360,
    scale: 1.2,
    transition: { duration: 0.6 }
  }
};

// Bounce animation
export const bounce: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Slide variants for carousel
export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 }
};
