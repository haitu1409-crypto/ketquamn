/**
 * PageSpeed Optimizer Component
 * Tối ưu hóa Core Web Vitals và PageSpeed
 */

import { useEffect } from 'react';

const PageSpeedOptimizer = () => {
    useEffect(() => {
        // ✅ REMOVED: All DOM manipulation functions that cause layout shift on mount
        // Preload links, preconnect links, and style elements should be in _document.js, not added dynamically
        // Modifying scripts after mount can cause script loading issues
        
        // ✅ REMOVED: optimizeLCP() - Creates preload links dynamically, causes FOUC
        // ✅ REMOVED: optimizeFID() - Modifies scripts after mount, can cause loading issues
        // ✅ REMOVED: optimizeCLS() - Adds CSS styles dynamically, causes layout shift
        // ✅ REMOVED: optimizeTTFB() - Creates preconnect links dynamically, causes FOUC
        
        // ✅ REMOVED: All DOM manipulation - these should be in _document.js or next.config.js

        // Performance monitoring
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                        console.log('CLS:', entry.value);
                    }
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }

    }, []);

    return null; // This component doesn't render anything
};

export default PageSpeedOptimizer;
