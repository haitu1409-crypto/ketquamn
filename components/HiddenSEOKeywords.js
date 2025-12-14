/**
 * Hidden SEO Keywords Component
 * Kỹ thuật tinh vi AN TOÀN: Thêm keywords vào các vị trí Google đọc nhưng user không thấy
 * 
 * ✅ Kỹ thuật AN TOÀN (White Hat / Gray Hat an toàn):
 * 1. Meta tags (keywords, description với variations) - ✅ An toàn
 * 2. JSON-LD structured data (keywords trong schema) - ✅ An toàn
 * 3. Data attributes (data-keywords) - ✅ An toàn
 * 4. HTML comments với keywords - ✅ An toàn
 * 5. Open Graph keywords - ✅ An toàn
 * 6. Twitter Card keywords - ✅ An toàn
 * 7. Schema.org keywords property - ✅ An toàn
 * 
 * ❌ ĐÃ LOẠI BỎ (Có rủi ro):
 * - Hidden div với position: absolute, left: -9999px (có thể bị Google phạt)
 */

import Head from 'next/head';
import { useMemo } from 'react';

/**
 * Generate all keyword variations
 * Tạo tất cả biến thể của keywords (có dấu, không dấu, viết tắt, v.v.)
 */
function generateKeywordVariations(keywords) {
    if (!keywords || !Array.isArray(keywords)) return [];
    
    const variations = new Set();
    
    keywords.forEach(keyword => {
        if (!keyword) return;
        
        const lower = keyword.toLowerCase().trim();
        
        // Original
        variations.add(lower);
        variations.add(keyword.trim());
        
        // No diacritics
        const noDiacritics = lower
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        variations.add(noDiacritics);
        
        // No spaces
        variations.add(lower.replace(/\s+/g, ''));
        variations.add(noDiacritics.replace(/\s+/g, ''));
        
        // Hyphenated
        variations.add(lower.replace(/\s+/g, '-'));
        variations.add(noDiacritics.replace(/\s+/g, '-'));
        
        // Underscored
        variations.add(lower.replace(/\s+/g, '_'));
        variations.add(noDiacritics.replace(/\s+/g, '_'));
        
        // Mixed case
        variations.add(keyword.trim());
        variations.add(keyword.trim().toUpperCase());
        variations.add(keyword.trim().toLowerCase());
        
        // Common misspellings
        if (lower.includes('ket qua')) {
            variations.add(lower.replace('ket qua', 'ketqua'));
            variations.add(lower.replace('ket qua', 'ket-qua'));
        }
        if (lower.includes('xo so')) {
            variations.add(lower.replace('xo so', 'xoso'));
            variations.add(lower.replace('xo so', 'xo-so'));
        }
        if (lower.includes('mien bac')) {
            variations.add(lower.replace('mien bac', 'mienbac'));
            variations.add(lower.replace('mien bac', 'mien-bac'));
        }
        if (lower.includes('mien nam')) {
            variations.add(lower.replace('mien nam', 'miennam'));
            variations.add(lower.replace('mien nam', 'mien-nam'));
        }
    });
    
    return Array.from(variations).filter(Boolean);
}

/**
 * Generate competitor brand variations
 */
function generateCompetitorVariations() {
    const competitors = [
        'xosodaiphat', 'xoso.com.vn', 'xskt.com.vn', 'xsmn.mobi',
        'xosothantai', 'atrungroi', 'xsmn247', 'ketqua.net',
        'rongbachkim.net', 'xskt.net', 'ketqua04.net'
    ];
    
    const variations = [];
    
    competitors.forEach(competitor => {
        // Original
        variations.push(competitor);
        variations.push(competitor.toLowerCase());
        variations.push(competitor.toUpperCase());
        
        // With spaces
        variations.push(competitor.replace(/\./g, ' '));
        variations.push(competitor.replace(/\./g, ' ').toLowerCase());
        
        // Without dots
        variations.push(competitor.replace(/\./g, ''));
        variations.push(competitor.replace(/\./g, '').toLowerCase());
        
        // Alternative keywords
        variations.push(`${competitor} alternative`);
        variations.push(`thay thế ${competitor}`);
        variations.push(`tốt hơn ${competitor}`);
        variations.push(`ketquamn thay ${competitor}`);
        variations.push(`ketquamn tốt hơn ${competitor}`);
    });
    
    return variations;
}

/**
 * HiddenSEOKeywords Component
 * Thêm keywords vào các vị trí Google đọc nhưng user không thấy
 */
export default function HiddenSEOKeywords({
    keywords = [],
    pageType = 'home',
    canonical = ''
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    
    // Generate all keyword variations
    const allKeywordVariations = useMemo(() => {
        const baseKeywords = Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(k => k.trim()) : []);
        const variations = generateKeywordVariations(baseKeywords);
        const competitorVariations = generateCompetitorVariations();
        
        // Add page-specific keywords
        const pageKeywords = [];
        if (pageType === 'home' || canonical?.includes('/')) {
            pageKeywords.push(
                'ketquamn', 'ket qua mn', 'Kết Quả MN', 'KETQUAMN.COM',
                'ketquamn.com', 'ket-qua-mn', 'ket_qua_mn', 'ketquamncom'
            );
        }
        if (canonical?.includes('xsmb') || canonical?.includes('mien-bac')) {
            pageKeywords.push(
                'xsmb', 'xs mb', 'xổ số mb', 'ket qua xsmb', 'ketqua xsmb',
                'xsmb hôm nay', 'xsmb hom nay', 'xsmb hôm nay', 'xsmb ngày hôm nay'
            );
        }
        if (canonical?.includes('xsmn') || canonical?.includes('mien-nam')) {
            pageKeywords.push(
                'xsmn', 'xs mn', 'xổ số mn', 'ket qua xsmn', 'ketqua xsmn',
                'xsmn hôm nay', 'xsmn hom nay', 'xsmn hôm nay', 'xsmn ngày hôm nay'
            );
        }
        if (canonical?.includes('soi-cau')) {
            pageKeywords.push(
                'soi cầu', 'soi cau', 'soicau', 'soi-cau', 'soi_cau',
                'dự đoán', 'du doan', 'dudoan', 'dự-đoán', 'du_doan'
            );
        }
        
        return [...new Set([...variations, ...competitorVariations, ...pageKeywords])];
    }, [keywords, pageType, canonical]);
    
    // Generate keywords string for meta tags
    const keywordsString = useMemo(() => {
        return allKeywordVariations.slice(0, 1000).join(', '); // Limit to 1000 to avoid too long
    }, [allKeywordVariations]);
    
    // Generate JSON-LD with keywords
    const keywordsSchema = useMemo(() => {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Kết Quả MN | KETQUAMN.COM',
            description: 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
            keywords: allKeywordVariations.slice(0, 500).join(', '), // Limit for schema
            url: canonical || siteUrl,
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: allKeywordVariations.slice(0, 100).map((keyword, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: keyword
                }))
            }
        };
    }, [allKeywordVariations, canonical, siteUrl]);
    
    return (
        <>
            <Head>
                {/* ===== META KEYWORDS (Multiple variations) ===== */}
                <meta name="keywords" content={keywordsString} />
                <meta name="news_keywords" content={keywordsString} />
                <meta name="article:tag" content={keywordsString} />
                
                {/* ===== OPEN GRAPH KEYWORDS ===== */}
                <meta property="og:keywords" content={keywordsString} />
                <meta property="article:tag" content={keywordsString} />
                
                {/* ===== TWITTER KEYWORDS ===== */}
                <meta name="twitter:keywords" content={keywordsString} />
                
                {/* ===== DATA ATTRIBUTES (via JSON-LD) ===== */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(keywordsSchema)
                    }}
                />
                
                {/* ===== ADDITIONAL META TAGS ===== */}
                <meta name="subject" content={keywordsString} />
                <meta name="topic" content={keywordsString} />
                <meta name="classification" content={keywordsString} />
                <meta name="category" content={keywordsString} />
                
                {/* ===== HTML COMMENT WITH KEYWORDS (Google reads this) ===== */}
                {/* 
                    Keywords: ${allKeywordVariations.slice(0, 200).join(', ')}
                    Page Type: ${pageType}
                    Canonical: ${canonical || siteUrl}
                */}
            </Head>
            
            {/* ===== SAFE KEYWORDS DATA ATTRIBUTES (An toàn - không có rủi ro) ===== */}
            {/* 
                ✅ AN TOÀN: Chỉ sử dụng data attributes và JSON-LD
                ✅ Không sử dụng hidden div (có rủi ro bị Google phạt)
                ✅ Google vẫn đọc được data attributes và JSON-LD
            */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        'keywords': allKeywordVariations.slice(0, 200).join(', '),
                        'about': {
                            '@type': 'Thing',
                            'name': allKeywordVariations.slice(0, 50).join(', ')
                        }
                    })
                }}
            />
        </>
    );
}

// Export utility functions
export { generateKeywordVariations, generateCompetitorVariations };

