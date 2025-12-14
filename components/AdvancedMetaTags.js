/**
 * Advanced Meta Tags Component
 * Tạo tất cả variations của meta tags để Google index mọi cách gõ
 * 
 * Kỹ thuật:
 * 1. Multiple title variations
 * 2. Multiple description variations
 * 3. Multiple keywords variations
 * 4. Language variations (vi, vi-VN)
 * 5. Region variations
 * 6. Device-specific meta tags
 * 7. Search engine-specific meta tags
 */

import Head from 'next/head';
import { useMemo } from 'react';

/**
 * Generate title variations
 */
function generateTitleVariations(title) {
    if (!title) return [];
    
    const variations = new Set();
    
    // Original
    variations.add(title);
    variations.add(title.toLowerCase());
    variations.add(title.toUpperCase());
    
    // No diacritics
    const noDiacritics = title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    variations.add(noDiacritics);
    variations.add(noDiacritics.toLowerCase());
    variations.add(noDiacritics.toUpperCase());
    
    // Common abbreviations
    if (title.includes('Kết Quả MN')) {
        variations.add(title.replace('Kết Quả MN', 'Ket Qua MN'));
        variations.add(title.replace('Kết Quả MN', 'KETQUAMN'));
        variations.add(title.replace('Kết Quả MN', 'ketquamn'));
    }
    if (title.includes('KETQUAMN.COM')) {
        variations.add(title.replace('KETQUAMN.COM', 'ketquamn.com'));
        variations.add(title.replace('KETQUAMN.COM', 'KETQUAMN'));
    }
    
    return Array.from(variations);
}

/**
 * Generate description variations
 */
function generateDescriptionVariations(description) {
    if (!description) return [];
    
    const variations = new Set();
    
    // Original
    variations.add(description);
    variations.add(description.toLowerCase());
    
    // No diacritics
    const noDiacritics = description
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    variations.add(noDiacritics);
    variations.add(noDiacritics.toLowerCase());
    
    // Common replacements
    const replacements = [
        ['Kết Quả MN', 'Ket Qua MN'],
        ['KETQUAMN.COM', 'ketquamn.com'],
        ['kết quả xổ số', 'ket qua xo so'],
        ['miền Bắc', 'mien Bac'],
        ['miền Nam', 'mien Nam'],
        ['miền Trung', 'mien Trung']
    ];
    
    replacements.forEach(([from, to]) => {
        if (description.includes(from)) {
            variations.add(description.replace(new RegExp(from, 'g'), to));
        }
    });
    
    return Array.from(variations);
}

/**
 * AdvancedMetaTags Component
 */
export default function AdvancedMetaTags({
    title = '',
    description = '',
    keywords = '',
    canonical = '',
    pageType = 'website',
    locale = 'vi_VN'
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = 'Kết Quả MN | KETQUAMN.COM';
    
    // Generate variations
    const titleVariations = useMemo(() => generateTitleVariations(title), [title]);
    const descriptionVariations = useMemo(() => generateDescriptionVariations(description), [description]);
    
    // Primary title and description
    const primaryTitle = titleVariations[0] || title;
    const primaryDescription = descriptionVariations[0] || description;
    
    return (
        <Head>
            {/* ===== PRIMARY META TAGS ===== */}
            <title>{primaryTitle}</title>
            <meta name="description" content={primaryDescription} />
            <meta name="keywords" content={keywords} />
            
            {/* ===== ALTERNATIVE TITLES (for different search engines) ===== */}
            {titleVariations.slice(1, 5).map((altTitle, index) => (
                <meta key={`alt-title-${index}`} name={`alternate-title-${index + 1}`} content={altTitle} />
            ))}
            
            {/* ===== ALTERNATIVE DESCRIPTIONS ===== */}
            {descriptionVariations.slice(1, 5).map((altDesc, index) => (
                <meta key={`alt-desc-${index}`} name={`alternate-description-${index + 1}`} content={altDesc} />
            ))}
            
            {/* ===== LANGUAGE VARIATIONS ===== */}
            <meta httpEquiv="content-language" content="vi" />
            <meta httpEquiv="content-language" content="vi-VN" />
            <meta name="language" content="Vietnamese" />
            <meta name="language" content="vi" />
            <meta name="language" content="vi-VN" />
            
            {/* ===== LOCALE VARIATIONS ===== */}
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:locale:alternate" content="vi" />
            <meta property="og:locale:alternate" content="vi-VN" />
            
            {/* ===== REGION VARIATIONS ===== */}
            <meta name="geo.region" content="VN" />
            <meta name="geo.region" content="VN-HN" />
            <meta name="geo.region" content="VN-HCM" />
            <meta name="geo.placename" content="Vietnam" />
            <meta name="geo.placename" content="Hà Nội" />
            <meta name="geo.placename" content="Hồ Chí Minh" />
            
            {/* ===== SEARCH ENGINE SPECIFIC ===== */}
            {/* Google */}
            <meta name="google" content="notranslate" />
            <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            
            {/* Bing */}
            <meta name="msvalidate.01" content="" />
            <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            
            {/* Cốc Cốc */}
            <meta name="coccocbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            
            {/* Yandex */}
            <meta name="yandex-verification" content="" />
            <meta name="yandexbot" content="index, follow" />
            
            {/* Baidu */}
            <meta name="baidu-site-verification" content="" />
            <meta name="baiduspider" content="index, follow" />
            
            {/* ===== DEVICE SPECIFIC ===== */}
            {/* Mobile */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Kết Quả MN" />
            
            {/* Tablet */}
            <meta name="tablet-web-app-capable" content="yes" />
            
            {/* Desktop */}
            <meta name="application-name" content="Kết Quả MN" />
            
            {/* ===== CONTENT TYPE VARIATIONS ===== */}
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            
            {/* ===== CACHE CONTROL ===== */}
            <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
            <meta httpEquiv="Expires" content={new Date(Date.now() + 3600000).toUTCString()} />
            
            {/* ===== REFRESH (for dynamic content) ===== */}
            {pageType === 'kqxs' && (
                <meta httpEquiv="refresh" content="300" /> // Refresh every 5 minutes for lottery results
            )}
            
            {/* ===== RATING ===== */}
            <meta name="rating" content="general" />
            <meta name="rating" content="safe for kids" />
            
            {/* ===== DISTRIBUTION ===== */}
            <meta name="distribution" content="global" />
            <meta name="distribution" content="worldwide" />
            
            {/* ===== REVISIT ===== */}
            <meta name="revisit-after" content="1 days" />
            <meta name="revisit-after" content="daily" />
            
            {/* ===== ROBOTS VARIATIONS ===== */}
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="robots" content="index, follow, archive" />
            <meta name="robots" content="index, follow, cache" />
            
            {/* ===== AUTHOR VARIATIONS ===== */}
            <meta name="author" content={siteName} />
            <meta name="author" content="Kết Quả MN" />
            <meta name="author" content="ketquamn.com" />
            <meta name="copyright" content={siteName} />
            <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteName}`} />
            
            {/* ===== GENERATOR ===== */}
            <meta name="generator" content="Next.js" />
            <meta name="generator" content="React" />
            
            {/* ===== FORMAT DETECTION ===== */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="email=no" />
            
            {/* ===== THEME COLOR VARIATIONS ===== */}
            <meta name="theme-color" content="#FF6B35" />
            <meta name="theme-color" content="#FF6B35" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#FF6B35" media="(prefers-color-scheme: dark)" />
            <meta name="msapplication-TileColor" content="#FF6B35" />
            <meta name="msapplication-navbutton-color" content="#FF6B35" />
            
            {/* ===== APPLE SPECIFIC ===== */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Kết Quả MN" />
            <meta name="apple-itunes-app" content="app-id=" />
            
            {/* ===== ANDROID SPECIFIC ===== */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="Kết Quả MN" />
            
            {/* ===== TWITTER CARD VARIATIONS ===== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@ketquamn" />
            <meta name="twitter:creator" content="@ketquamn" />
            <meta name="twitter:domain" content="ketquamn.com" />
            
            {/* ===== FACEBOOK SPECIFIC ===== */}
            <meta property="fb:app_id" content="" />
            <meta property="fb:admins" content="" />
            <meta property="fb:pages" content="" />
            
            {/* ===== ADDITIONAL OPEN GRAPH ===== */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:site_name" content="Kết Quả MN" />
            <meta property="og:site_name" content="ketquamn.com" />
            
            {/* ===== CANONICAL VARIATIONS ===== */}
            <link rel="canonical" href={canonical || siteUrl} />
            <link rel="canonical" href={(canonical || siteUrl).toLowerCase()} />
            
            {/* ===== ALTERNATE URLS ===== */}
            <link rel="alternate" hrefLang="vi" href={canonical || siteUrl} />
            <link rel="alternate" hrefLang="vi-VN" href={canonical || siteUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonical || siteUrl} />
            
            {/* ===== SHORTCUT ICONS ===== */}
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        </Head>
    );
}

// Export utility functions
export { generateTitleVariations, generateDescriptionVariations };

