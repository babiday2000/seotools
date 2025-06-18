// Performance utilities for better LCP and other Core Web Vitals

// Preload critical resources
export const preloadResource = (href: string, as: 'style' | 'script' | 'font' | 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (as === 'font') {
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
};

// Optimize image loading with intersection observer
export const optimizeImageLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Find all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

// Critical resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
  ];

  hints.forEach(({ rel, href, crossorigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossorigin) {
      link.crossOrigin = crossorigin;
    }
    document.head.appendChild(link);
  });
};

// Defer non-critical scripts
export const deferScript = (src: string, callback?: () => void) => {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.async = true;
  
  if (callback) {
    script.onload = callback;
  }
  
  document.head.appendChild(script);
};

// Monitor LCP element and optimize
export const optimizeLCP = () => {
  // Use PerformanceObserver to track LCP
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      if (lastEntry?.element) {
        const lcpElement = lastEntry.element;
        
        // Add high priority loading hint to LCP element if it's an image
        if (lcpElement.tagName === 'IMG') {
          lcpElement.loading = 'eager';
          lcpElement.decoding = 'sync';
          lcpElement.fetchPriority = 'high';
        }
        
        // Add critical styles for LCP element
        lcpElement.style.contentVisibility = 'auto';
        lcpElement.style.containIntrinsicSize = '1px 500px';
      }
    });

    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP observer not supported
    }
  }
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      optimizeLCP();
    });
  } else {
    optimizeImageLoading();
    optimizeLCP();
  }
  
  // Add resource hints immediately
  addResourceHints();
};
