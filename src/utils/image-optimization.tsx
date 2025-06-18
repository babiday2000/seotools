// Image optimization configuration
export const IMAGE_CONFIG = {
  // Supported formats in order of preference
  formats: ['webp', 'avif', 'png', 'jpg'],
  
  // Quality settings
  quality: {
    webp: 85,
    avif: 80,
    jpg: 85,
    png: 90
  },
  
  // Size limits (in KB)
  maxSize: {
    thumbnail: 50,
    medium: 200,
    large: 500
  },
  
  // Lazy loading settings
  lazyLoading: {
    threshold: '10px',
    placeholderColor: '#f3f4f6'
  }
};

// Image component with performance optimizations
import { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'empty'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    const ext = baseSrc.split('.').pop();
    const base = baseSrc.replace(`.${ext}`, '');
    
    return [
      `${base}-small.webp 480w`,
      `${base}-medium.webp 768w`,
      `${base}-large.webp 1200w`,
      `${baseSrc} 1920w`
    ].join(', ');
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={generateSrcSet(src)}
      sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1920px"
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      style={{
        backgroundColor: placeholder === 'blur' ? IMAGE_CONFIG.lazyLoading.placeholderColor : 'transparent'
      }}
    />
  );
};
