/**
 * Enhanced SEO Head Component
 * Wrapper component kết hợp SEOOptimized và MultiSearchEngineOptimizer
 * Sử dụng cho tất cả pages
 */

import SEOOptimized from './SEOOptimized';
import MultiSearchEngineOptimizer from './MultiSearchEngineOptimizer';
import AdvancedSEO from './AdvancedSEO';
import UltimateSEO from './UltimateSEO';
import CoreWebVitalsOptimizer from './CoreWebVitalsOptimizer';
import PageExperienceSignals from './PageExperienceSignals';
import BrandTargetingSEO from './BrandTargetingSEO';
import { memo } from 'react';

const EnhancedSEOHead = memo(function EnhancedSEOHead({
    pageType = 'home',
    customTitle,
    customDescription,
    customKeywords,
    canonicalUrl,
    ogImage,
    breadcrumbs,
    faq,
    structuredData = [],
    locale = 'vi_VN',
    author = 'Kết Quả MN | KETQUAMN.COM',
    // Backward compatibility: support both 'title' and 'customTitle'
    title,
    description,
    keywords,
    canonical,
}) {
    // Support both old prop names (title, description, keywords, canonical) and new ones (customTitle, etc.)
    const finalTitle = customTitle || title;
    const finalDescription = customDescription || description;
    const finalKeywords = customKeywords || keywords;
    const finalCanonical = canonicalUrl || canonical;
    return (
        <>
            {/* ✅ UltimateSEO - Latest 2024-2025 SEO Standards (E-E-A-T, Core Web Vitals, Helpful Content) */}
            {/* Main SEO component - contains all essential meta tags and structured data */}
            <UltimateSEO
                title={finalTitle}
                description={finalDescription}
                keywords={finalKeywords}
                canonical={finalCanonical}
                ogImage={ogImage}
                pageType={pageType === 'home' ? 'website' : (pageType === 'article' ? 'article' : 'website')}
                author={author}
                structuredData={structuredData}
                breadcrumbs={breadcrumbs}
                faq={faq}
                articleData={pageType === 'article' ? { publishedTime: new Date().toISOString(), modifiedTime: new Date().toISOString() } : null}
                helpfulContent={true}
                originalContent={true}
                contentQuality="high"
                noindex={false}
            />

            {/* ✅ MultiSearchEngineOptimizer - Enhanced for Bing, Cốc Cốc, Yandex, Baidu */}
            {/* Only additional meta tags for other search engines - no duplicate structured data */}
            <MultiSearchEngineOptimizer
                title={finalTitle}
                description={finalDescription}
                keywords={finalKeywords}
                url={finalCanonical}
                image={ogImage}
                locale={locale}
                type={pageType === 'home' ? 'website' : 'article'}
                author={author}
                structuredData={null}
            />

            {/* ✅ Page Experience Signals - Lightweight, only meta tags */}
            <PageExperienceSignals />

            {/* ❌ REMOVED: AdvancedSEO - Duplicate of UltimateSEO, causing performance issues */}
            {/* ❌ REMOVED: CoreWebVitalsOptimizer - Loading external CDN script slows down page */}
            {/* ❌ REMOVED: BrandTargetingSEO - Can be lazy loaded or moved to specific pages only */}
        </>
    );
});

export default EnhancedSEOHead;












