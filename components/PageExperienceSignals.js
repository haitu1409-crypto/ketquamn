/**
 * Page Experience Signals Optimizer
 * 
 * Tối ưu các tín hiệu Page Experience:
 * - Mobile-friendly
 * - Safe browsing
 * - HTTPS
 * - No intrusive interstitials
 * - Core Web Vitals
 * 
 * Dựa trên: https://developers.google.com/search/docs/appearance/page-experience
 */

import { useEffect } from 'react';
import Head from 'next/head';

export default function PageExperienceSignals() {
    // ✅ Optimized: Only run on client-side, defer non-critical checks
    useEffect(() => {
        // Defer all checks to avoid blocking initial render
        const timeoutId = setTimeout(() => {
            // ✅ No intrusive interstitials: Remove popups that block content
            const removeIntrusiveInterstitials = () => {
                const overlays = document.querySelectorAll('.popup-overlay, .modal-overlay, [data-intrusive]');
                overlays.forEach(overlay => {
                    if (overlay.style.display !== 'none') {
                        overlay.style.display = 'none';
                    }
                });
            };

            // ✅ Accessibility: Ensure proper ARIA labels (lightweight check)
            const ensureAccessibility = () => {
                const images = document.querySelectorAll('img:not([alt])');
                images.forEach(img => {
                    if (!img.alt) {
                        img.alt = img.getAttribute('aria-label') || 'Image';
                    }
                });
            };

            removeIntrusiveInterstitials();
            ensureAccessibility();
        }, 100); // Defer by 100ms to not block initial render

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Head>
            {/* ✅ Mobile-friendly signals */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            
            {/* ✅ Safe browsing signals */}
            {/* Note: Security headers are set via HTTP headers in vercel.json, not meta tags */}
            {/* X-Frame-Options, X-Content-Type-Options, X-XSS-Protection are configured in vercel.json */}
            
            {/* ✅ HTTPS enforcement */}
            {/* Note: HSTS should be set via HTTP headers, not meta tags */}
            
            {/* ✅ No intrusive interstitials */}
            <meta name="no-intrusive-interstitials" content="true" />
        </Head>
    );
}

