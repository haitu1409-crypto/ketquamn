/**
 * Server-Side SEO Component
 * Tối ưu SEO cho SSR (Server-Side Rendering)
 * 
 * Kỹ thuật:
 * 1. Pre-render meta tags on server
 * 2. Generate structured data on server
 * 3. Optimize for Googlebot
 * 4. Cache SEO data
 * 5. Generate sitemap on server
 */

import { useMemo } from 'react';

/**
 * Generate SEO data for server-side rendering
 */
export function generateServerSideSEO({
    pageType = 'home',
    title = '',
    description = '',
    keywords = '',
    canonical = '',
    ogImage = '',
    faq = [],
    breadcrumbs = []
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = 'Kết Quả MN | KETQUAMN.COM';
    const currentDate = new Date().toISOString();
    const fullUrl = canonical || siteUrl;
    const imageUrl = ogImage || `${siteUrl}/logo1.png`;
    
    // Generate all meta tags
    const metaTags = {
        // Basic
        title: title || `${siteName} - Kết quả xổ số 3 miền nhanh nhất`,
        description: description || 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất. XSMN, XSMB, XSMT, KQXSMN, KQXSMB, KQXSMT.',
        keywords: keywords || 'ketquamn, ket qua mn, KETQUAMN.COM, kết quả xổ số, xsmb, xsmn, xsmt',
        canonical: fullUrl,
        
        // Open Graph
        'og:title': title || `${siteName} - Kết quả xổ số 3 miền`,
        'og:description': description || 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
        'og:image': imageUrl,
        'og:url': fullUrl,
        'og:type': pageType === 'article' ? 'article' : 'website',
        'og:site_name': siteName,
        'og:locale': 'vi_VN',
        
        // Twitter
        'twitter:card': 'summary_large_image',
        'twitter:title': title || `${siteName} - Kết quả xổ số 3 miền`,
        'twitter:description': description || 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
        'twitter:image': imageUrl,
        
        // Robots
        robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        googlebot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        bingbot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        coccocbot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        
        // Language
        'content-language': 'vi',
        language: 'Vietnamese',
        'geo.region': 'VN',
        'geo.placename': 'Vietnam',
        
        // Author
        author: siteName,
        copyright: `© ${new Date().getFullYear()} ${siteName}`,
        
        // Generator
        generator: 'Next.js',
        
        // Rating
        rating: 'general',
        
        // Distribution
        distribution: 'global',
        
        // Revisit
        'revisit-after': '1 days'
    };
    
    // Generate structured data
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        description: description || 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        },
        publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
                '@type': 'ImageObject',
                url: imageUrl
            }
        }
    };
    
    // Add FAQ schema if available
    if (faq && faq.length > 0) {
        structuredData.faq = {
            '@type': 'FAQPage',
            mainEntity: faq.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer
                }
            }))
        };
    }
    
    // Add breadcrumb schema if available
    if (breadcrumbs && breadcrumbs.length > 0) {
        structuredData.breadcrumb = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: crumb.url
            }))
        };
    }
    
    return {
        metaTags,
        structuredData,
        links: {
            canonical: fullUrl,
            alternate: [
                { hreflang: 'vi', href: fullUrl },
                { hreflang: 'vi-VN', href: fullUrl },
                { hreflang: 'x-default', href: fullUrl }
            ]
        }
    };
}

/**
 * ServerSideSEO Component
 * Renders SEO data optimized for server-side rendering
 */
export default function ServerSideSEO(props) {
    const seoData = useMemo(() => generateServerSideSEO(props), [props]);
    
    // This component is mainly for server-side use
    // The actual rendering is done by Head component in pages
    return null;
}

// Export function for use in getServerSideProps or getStaticProps
export { generateServerSideSEO };












