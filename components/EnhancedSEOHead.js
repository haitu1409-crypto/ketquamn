/**
 * Enhanced SEO Head Component
 * Wrapper component kết hợp SEOOptimized và MultiSearchEngineOptimizer
 * Sử dụng cho tất cả pages
 */

import SEOOptimized from './SEOOptimized';
import MultiSearchEngineOptimizer from './MultiSearchEngineOptimizer';
import AdvancedSEO from './AdvancedSEO';
import HiddenSEOKeywords from './HiddenSEOKeywords';
import AdvancedMetaTags from './AdvancedMetaTags';
import DynamicSchemaGenerator from './DynamicSchemaGenerator';
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
    // ✅ Mobile Performance: Only render essential SEO components
    // AdvancedSEO handles most meta tags, others are redundant for performance
    return (
        <>
            {/* ✅ AdvancedSEO - Main SEO component (handles most meta tags) */}
            <AdvancedSEO
                title={finalTitle}
                description={finalDescription}
                keywords={finalKeywords}
                canonical={finalCanonical}
                ogImage={ogImage}
                pageType={pageType === 'home' ? 'website' : (pageType === 'article' ? 'article' : 'website')}
                structuredData={structuredData}
                breadcrumbs={breadcrumbs}
                faq={faq}
                articleData={pageType === 'article' ? { publishedTime: new Date().toISOString(), modifiedTime: new Date().toISOString() } : null}
                noindex={false}
            />

            {/* ✅ MultiSearchEngineOptimizer - Essential for Bing, Cốc Cốc */}
            <MultiSearchEngineOptimizer
                title={finalTitle}
                description={finalDescription}
                keywords={finalKeywords}
                url={finalCanonical}
                image={ogImage}
                locale={locale}
                type={pageType === 'home' ? 'website' : 'article'}
                author={author}
                structuredData={structuredData}
            />
            
            {/* ✅ HiddenSEOKeywords - Lightweight, important for SEO */}
            <HiddenSEOKeywords
                keywords={finalKeywords ? finalKeywords.split(',').map(k => k.trim()) : []}
                pageType={pageType}
                canonical={finalCanonical}
            />
            
            {/* ✅ DynamicSchemaGenerator - Important structured data */}
            <DynamicSchemaGenerator
                pageType={pageType}
                title={finalTitle}
                description={finalDescription}
                canonical={finalCanonical}
                ogImage={ogImage}
                faq={faq}
                breadcrumbs={breadcrumbs}
                articleData={pageType === 'article' ? { publishedTime: new Date().toISOString(), modifiedTime: new Date().toISOString() } : null}
            />
        </>
    );
});

export default EnhancedSEOHead;












