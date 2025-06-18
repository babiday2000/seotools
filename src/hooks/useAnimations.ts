import { useEffect, useState } from 'react';

/**
 * Hook to manage animations after page load to prevent layout shifts
 * Returns true only after the page has fully loaded and animations are safe to enable
 */
export const useAnimations = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  useEffect(() => {
    // Check if animations are already enabled (page already loaded)
    if (document.documentElement.classList.contains('animations-enabled')) {
      setAnimationsEnabled(true);
      return;
    }

    // Enable animations after a short delay to ensure page stability
    const timer = setTimeout(() => {
      document.documentElement.classList.add('animations-enabled');
      setAnimationsEnabled(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return animationsEnabled;
};

/**
 * Utility function to get animation classes that are safe to use
 * Returns the animation class only if animations are enabled globally
 */
export const getAnimationClass = (animationClass: string): string => {
  if (typeof document === 'undefined') return '';
  
  const animationsEnabled = document.documentElement.classList.contains('animations-enabled');
  return animationsEnabled ? animationClass : '';
};
