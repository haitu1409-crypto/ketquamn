/**
 * Web Vitals Tracking
 * Theo dõi Core Web Vitals cho Google Analytics
 */

import { useEffect } from 'react';

// Track Web Vitals to Google Analytics
export function sendToGoogleAnalytics({ name, delta, value, id }) {
    // Check if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            non_interaction: true,
        });
    }
}

// Track Web Vitals to Console (Development)
export function sendToConsole({ name, delta, value, id, rating }) {
    console.log('[Web Vitals]', {
        name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        delta: Math.round(name === 'CLS' ? delta * 1000 : delta),
        rating,
        id,
    });
}

// Web Vitals Component
// ✅ OPTIMIZED: Defer loading để không block initial render
export default function WebVitals() {
    useEffect(() => {
        // ✅ OPTIMIZED: Chỉ load sau khi page đã render (delay 2s)
        if (typeof window !== 'undefined') {
            const timer = setTimeout(() => {
                // Dynamic import to reduce initial bundle
                import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
                    const sendMetric = process.env.NODE_ENV === 'production'
                        ? sendToGoogleAnalytics
                        : sendToConsole;

                    onCLS(sendMetric);
                    onFID(sendMetric);
                    onFCP(sendMetric);
                    onLCP(sendMetric);
                    onTTFB(sendMetric);
                    onINP(sendMetric);
                }).catch(err => {
                    // Silent fail - không log error
                });
            }, 2000); // Delay 2s để không block initial render

            return () => clearTimeout(timer);
        }
    }, []);

    return null;
}

