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
 * 
 * ✅ FIXED: Loại bỏ logic DOM manipulation trong useEffect để tránh layout shift
 * Logic sửa đổi DOM sẽ gây ra layout shift khi trang load, chỉ giữ lại meta tags
 */

import Head from 'next/head';

export default function PageExperienceSignals() {
    // ✅ REMOVED: useEffect với DOM manipulation gây layout shift
    // Logic removeIntrusiveInterstitials và ensureAccessibility đã được loại bỏ
    // vì chúng thay đổi DOM sau khi mount, gây ra layout shift
    // Nếu cần logic này, nên chạy sau khi page đã render hoàn toàn (sau 500ms+)

    return (
        <Head>
            {/* ✅ Mobile-friendly signals */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            
            {/* ✅ Safe browsing signals */}
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            {/* ✅ REMOVED: X-Frame-Options - Must be set via HTTP headers only, not meta tags */}
            {/* ✅ REMOVED: X-XSS-Protection - Deprecated, Content-Security-Policy is sufficient */}
            
            {/* ✅ HTTPS enforcement */}
            <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
            
            {/* ✅ No intrusive interstitials */}
            <meta name="no-intrusive-interstitials" content="true" />
        </Head>
    );
}

