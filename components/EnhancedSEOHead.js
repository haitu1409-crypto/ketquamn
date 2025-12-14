/**
 * Enhanced SEO Head Component
 * ✅ OPTIMIZED: Simplified to use only SEOOptimized for better performance
 * Similar to old project structure for fast initial load
 */

import SEOOptimized from './SEOOptimized';
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
        <SEOOptimized
            pageType={pageType}
            title={finalTitle}
            description={finalDescription}
            keywords={finalKeywords}
            canonical={finalCanonical}
            ogImage={ogImage}
            breadcrumbs={breadcrumbs}
            faq={faq}
            structuredData={structuredData}
            author={author}
        />
    );
});

export default EnhancedSEOHead;












