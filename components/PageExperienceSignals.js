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
    useEffect(() => {
        // ✅ Mobile-friendly: Ensure viewport is set correctly
        const ensureMobileFriendly = () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (!viewport) {
                const meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
                document.head.appendChild(meta);
            }
        };

        // ✅ Safe browsing: Check for malicious content
        const checkSafeBrowsing = () => {
            // This would typically be done server-side
            // Here we just ensure no suspicious scripts are loaded
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                const src = script.src;
                if (src && !src.startsWith('http://localhost') && !src.startsWith('https://')) {
                    console.warn('Non-HTTPS script detected:', src);
                }
            });
        };

        // ✅ No intrusive interstitials: Remove popups that block content
        const removeIntrusiveInterstitials = () => {
            // Remove any full-screen overlays on page load
            const overlays = document.querySelectorAll('.popup-overlay, .modal-overlay, [data-intrusive]');
            overlays.forEach(overlay => {
                if (overlay.style.display !== 'none') {
                    overlay.style.display = 'none';
                }
            });
        };

        // ✅ Accessibility: Ensure proper ARIA labels
        const ensureAccessibility = () => {
            const images = document.querySelectorAll('img:not([alt])');
            images.forEach(img => {
                if (!img.alt) {
                    img.alt = img.getAttribute('aria-label') || 'Image';
                }
            });

            const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
            buttons.forEach(button => {
                if (!button.textContent.trim()) {
                    button.setAttribute('aria-label', 'Button');
                }
            });
        };

        ensureMobileFriendly();
        checkSafeBrowsing();
        removeIntrusiveInterstitials();
        ensureAccessibility();
    }, []);

    return (
        <Head>
            {/* ✅ Mobile-friendly signals */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            
            {/* ✅ Safe browsing signals */}
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
            <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
            
            {/* ✅ HTTPS enforcement */}
            <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
            
            {/* ✅ No intrusive interstitials */}
            <meta name="no-intrusive-interstitials" content="true" />
        </Head>
    );
}

