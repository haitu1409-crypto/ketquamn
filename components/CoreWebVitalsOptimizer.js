/**
 * Core Web Vitals Optimizer
 * 
 * Tối ưu hóa các chỉ số Core Web Vitals:
 * - LCP (Largest Contentful Paint): < 2.5s
 * - FID (First Input Delay): < 100ms
 * - CLS (Cumulative Layout Shift): < 0.1
 * 
 * Dựa trên: https://developers.google.com/search/docs/appearance/core-web-vitals
 */

import { useEffect } from 'react';
import Script from 'next/script';

export default function CoreWebVitalsOptimizer() {
    useEffect(() => {
        // ✅ FIX: Only run on client to avoid hydration mismatch
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        // ✅ REMOVED: preloadCriticalResources() - Causes layout shift on mount
        // Preload links should be in _document.js <Head>, not added dynamically via JS
        // Dynamic addition of preload links can cause FOUC and layout shifts
        
        // ✅ REMOVED: reserveImageSpace() - Causes layout shift on mount
        // Images should have width/height attributes in HTML, not set via JS
        
        // ✅ REMOVED: deferNonCriticalScripts() - Can cause script loading issues
        // Scripts should be properly configured in Next.js config
    }, []);

    return (
        <>
            {/* ✅ Web Vitals Measurement Script */}
            <Script
                id="web-vitals"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            // Measure Core Web Vitals
                            function sendToAnalytics(metric) {
                                // Send to Google Analytics or your analytics service
                                if (typeof gtag !== 'undefined') {
                                    gtag('event', metric.name, {
                                        event_category: 'Web Vitals',
                                        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                                        event_label: metric.id,
                                        non_interaction: true,
                                    });
                                }
                                
                                // Log to console in development (check at runtime to avoid hydration mismatch)
                                if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
                                    console.log('Web Vital:', metric.name, metric.value);
                                }
                            }
                            
                            // Load web-vitals library
                            if (typeof window !== 'undefined' && !window.webVitalsLoaded) {
                                window.webVitalsLoaded = true;
                                import('https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
                                    onCLS(sendToAnalytics);
                                    onFID(sendToAnalytics);
                                    onLCP(sendToAnalytics);
                                    onFCP(sendToAnalytics);
                                    onTTFB(sendToAnalytics);
                                }).catch(() => {
                                    // Fallback if CDN fails
                                    console.warn('Web Vitals library failed to load');
                                });
                            }
                        })();
                    `
                }}
            />
        </>
    );
}


