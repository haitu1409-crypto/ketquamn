/**
 * Custom App Component
 * Wrapper cho tất cả các pages, quản lý global state và styles
 * Tích hợp Analytics và Web Vitals tracking
 */

// ✅ Import CSS in correct order
import '../styles/globals.css';
import '../styles/fonts.css';
import '../styles/CLSFix.css';
import '../styles/CriticalCLSFix.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import dynamic from 'next/dynamic';
import reportWebVitals from '../lib/reportWebVitals';
import { AuthProvider } from '../hooks/useAuth';

// ✅ Multi-Search Engine Optimizer - For Bing, Cốc Cốc, Google
const MultiSearchEngineOptimizer = dynamic(() => import('../components/MultiSearchEngineOptimizer'), {
    ssr: true,  // SSR for SEO
    loading: () => null
});

// ✅ SEO Schema Components
const OrganizationSchema = dynamic(() => import('../components/SEO/OrganizationSchema'), {
    ssr: true,
    loading: () => null
});

// Lazy load heavy components with proper error handling
const Analytics = dynamic(() => import('../components/Analytics'), {
    ssr: false,
    loading: () => null
});
const WebVitals = dynamic(() => import('../components/WebVitals'), {
    ssr: false,
    loading: () => null
});
const WebVitalsMonitor = dynamic(() => import('../components/WebVitalsMonitor'), {
    ssr: false,
    loading: () => null
});
// ✅ Temporarily disabled due to web-vitals dependency issue
// const SEOAnalyticsEnhanced = dynamic(() => import('../components/SEOAnalyticsEnhanced'), {
//     ssr: false,
//     loading: () => null
// });
const GoogleAnalytics = dynamic(() => import('../components/GoogleAnalytics'), {
    ssr: false,
    loading: () => null
});

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Log app version (optional)
        if (process.env.NODE_ENV === 'production') {
            console.log('%c🎲 Tạo Dàn Đề v1.0.0', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
            console.log('%cWebsite: ' + process.env.NEXT_PUBLIC_SITE_URL, 'color: #6B7280;');
        }

        // ✅ Disable browser's automatic scroll restoration
        if (typeof window !== 'undefined') {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
            // Clear any existing scroll positions in sessionStorage
            try {
                const keys = Object.keys(sessionStorage);
                keys.forEach(key => {
                    if (key.startsWith('scrollPosition_')) {
                        sessionStorage.removeItem(key);
                    }
                });
            } catch (e) {
                // Ignore errors
            }
        }
    }, []);

    // ✅ Reset scroll position when pathname changes (additional safety)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [router.pathname]);

    // Handle route changes for smooth navigation
    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true);
            // ✅ Reset scroll position to top when navigation starts
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        };
        const handleComplete = () => {
            setIsLoading(false);
            // ✅ Ensure scroll is at top when navigation completes (backup)
            if (typeof window !== 'undefined') {
                // Use multiple strategies to ensure scroll reset
                const resetScroll = () => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    // Also reset documentElement scroll
                    if (document.documentElement) {
                        document.documentElement.scrollTop = 0;
                    }
                    if (document.body) {
                        document.body.scrollTop = 0;
                    }
                };
                
                // Reset immediately
                resetScroll();
                
                // Reset again after a short delay to catch any delayed scroll restoration
                requestAnimationFrame(() => {
                    resetScroll();
                    setTimeout(() => {
                        resetScroll();
                    }, 50);
                });
            }
        };
        const handleError = () => {
            setIsLoading(false);
            console.log('Route change error occurred');
            // ✅ Reset scroll even on error
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleError);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleError);
        };
    }, [router]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />

                {/* ✅ Critical resource hints for LCP optimization */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

                {/* ✅ Preload critical images with fetchpriority */}
                <link rel="preload" as="image" href="/logo1.png" fetchPriority="high" />
                {/* ✅ REMOVED: Duplicate preload for same image */}

                {/* ✅ Search Engine Verification */}
                {/* TODO: Thay YOUR_GOOGLE_VERIFICATION_CODE bằng code thật từ Search Console */}
                <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "YOUR_GOOGLE_VERIFICATION_CODE"} />
                <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION || "YOUR_BING_VERIFICATION_CODE"} />
                <meta name="coccoc-verification" content={process.env.NEXT_PUBLIC_COCCOC_VERIFICATION || "YOUR_COCCOC_VERIFICATION_CODE"} />
            </Head>

            {/* ✅ Multi-Search Engine Optimizer */}
            <MultiSearchEngineOptimizer
                title="Kết Quả MN - Kết quả xổ số miền Nam 2025"
                description="Kết quả xổ số miền Nam nhanh nhất, chính xác nhất. Xem kết quả XSMN, KQXSMN hôm nay."
                keywords="kết quả xổ số miền Nam, xsmn, kqxsmn, sxmn, kết quả MN, xổ số miền Nam"
            />

            {/* ✅ SEO Schema - Organization */}
            <OrganizationSchema />

            {/* Google Analytics */}
            <Analytics />
            <GoogleAnalytics />

            {/* Web Vitals Tracking */}
            <WebVitals />

            {/* Enhanced Web Vitals Monitor */}
            <WebVitalsMonitor />

            {/* SEO Analytics Enhanced - Temporarily disabled */}
            {/* <SEOAnalyticsEnhanced /> */}


            {/* Loading indicator */}
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: 'linear-gradient(90deg, #FF6B35, #FF8C42)',
                    zIndex: 9999,
                    animation: 'loading 1s ease-in-out infinite'
                }} />
            )}

            {/* Main Component */}
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>

            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100vw); }
                }
            `}</style>
        </>
    );
}

export default MyApp;

// Export reportWebVitals for Next.js
export { reportWebVitals };

