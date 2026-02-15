
import React, { useEffect, useCallback } from 'react';
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance';

interface OptimizedTouchInteractionsProps {
  children: React.ReactNode;
}

const OptimizedTouchInteractions: React.FC<OptimizedTouchInteractionsProps> = ({ children }) => {
  const { capabilities } = useOptimizedPerformance();

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!capabilities.isMobile) return;
    
    const target = e.target as HTMLElement;
    const interactiveElement = target.closest(
      '.touch-target, button, a, [role="button"], .framework-bubble, .timeline-item, .hexagon, .blog-card'
    );
    
    if (interactiveElement) {
      interactiveElement.classList.add('touch-active');
      
      // Add haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  }, [capabilities.isMobile]);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!capabilities.isMobile) return;
    
    // Remove touch active state from all elements
    const elements = document.querySelectorAll('.touch-active');
    elements.forEach(el => {
      el.classList.remove('touch-active');
    });
  }, [capabilities.isMobile]);
  
  const handleTouchCancel = useCallback((e: TouchEvent) => {
    if (!capabilities.isMobile) return;
    
    const elements = document.querySelectorAll('.touch-active');
    elements.forEach(el => {
      el.classList.remove('touch-active');
    });
  }, [capabilities.isMobile]);

  useEffect(() => {
    if (!capabilities.isMobile) return;
    
    const options = { passive: true };
    
    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchend', handleTouchEnd, options);
    document.addEventListener('touchcancel', handleTouchCancel, options);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [capabilities.isMobile, handleTouchStart, handleTouchEnd, handleTouchCancel]);

  return <>{children}</>;
};

export default OptimizedTouchInteractions;
