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

        // ✅ LCP Optimization: Preload critical resources
        const preloadCriticalResources = () => {
            // Preload logo (LCP element)
            const logoLink = document.createElement('link');
            logoLink.rel = 'preload';
            logoLink.as = 'image';
            logoLink.href = '/logo1.png';
            logoLink.fetchPriority = 'high';
            document.head.appendChild(logoLink);

            // Preload critical fonts
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.as = 'font';
            fontLink.type = 'font/woff2';
            fontLink.crossOrigin = 'anonymous';
            fontLink.href = '/fonts/inter-var.woff2';
            document.head.appendChild(fontLink);
        };

        // ✅ CLS Optimization: Reserve space for images
        const reserveImageSpace = () => {
            const images = document.querySelectorAll('img:not([width]):not([height])');
            images.forEach(img => {
                if (!img.width || !img.height) {
                    // Set aspect ratio to prevent layout shift
                    img.style.aspectRatio = '16/9';
                    img.style.objectFit = 'cover';
                }
            });
        };

        // ✅ FID Optimization: Defer non-critical scripts
        const deferNonCriticalScripts = () => {
            const scripts = document.querySelectorAll('script[data-defer]');
            scripts.forEach(script => {
                if (script.src) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    newScript.async = true;
                    newScript.defer = true;
                    script.parentNode.replaceChild(newScript, script);
                }
            });
        };

        preloadCriticalResources();
        reserveImageSpace();
        deferNonCriticalScripts();
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


