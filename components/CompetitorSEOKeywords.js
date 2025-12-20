/**
 * Competitor SEO Keywords Component
 * Target competitor brand names để khi user search tên đối thủ, trang mình vẫn hiển thị top 2-3
 * 
 * Kỹ thuật:
 * - Brand + feature combinations
 * - Comparison keywords
 * - Alternative keywords
 * - Negative SEO (an toàn - highlight ưu điểm)
 */

import { useMemo } from 'react';

/**
 * Competitor Keywords Map
 * Map từng đối thủ với các keywords cần target
 */
const COMPETITOR_KEYWORDS = {
    // XOSODAIPHAT
    xosodaiphat: {
        brand: ['xosodaiphat', 'xoso dai phat', 'xosodaiphat.com'],
        alternatives: [
            'xosodaiphat alternative',
            'thay thế xosodaiphat',
            'tốt hơn xosodaiphat',
            'ketquamn thay xosodaiphat',
            'ketquamn tốt hơn xosodaiphat'
        ],
        comparisons: [
            'xosodaiphat vs ketquamn',
            'so sánh xosodaiphat và ketquamn',
            'xosodaiphat hay ketquamn',
            'ketquamn hay xosodaiphat'
        ],
        features: [
            'xosodaiphat kết quả xổ số',
            'xosodaiphat xsmb',
            'xosodaiphat xsmn',
            'ketquamn kết quả xổ số tốt hơn xosodaiphat',
            'ketquamn xsmb nhanh hơn xosodaiphat'
        ],
        negatives: [
            'xosodaiphat chậm',
            'xosodaiphat lỗi',
            'xosodaiphat không load',
            'ketquamn nhanh hơn xosodaiphat',
            'ketquamn ổn định hơn xosodaiphat'
        ]
    },
    
    // XOSO.COM.VN
    xoso: {
        brand: ['xoso.com.vn', 'xoso', 'xoso com vn'],
        alternatives: [
            'xoso.com.vn alternative',
            'thay thế xoso.com.vn',
            'tốt hơn xoso.com.vn',
            'ketquamn thay xoso',
            'ketquamn tốt hơn xoso'
        ],
        comparisons: [
            'xoso.com.vn vs ketquamn',
            'so sánh xoso và ketquamn',
            'xoso hay ketquamn',
            'ketquamn hay xoso'
        ],
        features: [
            'xoso.com.vn kết quả xổ số',
            'xoso xsmb',
            'xoso xsmn',
            'ketquamn kết quả xổ số tốt hơn xoso',
            'ketquamn xsmb nhanh hơn xoso'
        ],
        negatives: [
            'xoso.com.vn chậm',
            'xoso.com.vn lỗi',
            'ketquamn nhanh hơn xoso',
            'ketquamn ổn định hơn xoso'
        ]
    },
    
    // XSKT.COM.VN
    xskt: {
        brand: ['xskt.com.vn', 'xskt', 'xskt com vn'],
        alternatives: [
            'xskt.com.vn alternative',
            'thay thế xskt.com.vn',
            'tốt hơn xskt.com.vn',
            'ketquamn thay xskt',
            'ketquamn tốt hơn xskt'
        ],
        comparisons: [
            'xskt.com.vn vs ketquamn',
            'so sánh xskt và ketquamn',
            'xskt hay ketquamn',
            'ketquamn hay xskt'
        ],
        features: [
            'xskt.com.vn kết quả xổ số',
            'xskt xsmb',
            'xskt soi cầu',
            'ketquamn soi cầu tốt hơn xskt',
            'ketquamn xsmb nhanh hơn xskt'
        ],
        negatives: [
            'xskt.com.vn chậm',
            'xskt.com.vn lỗi',
            'ketquamn nhanh hơn xskt',
            'ketquamn ổn định hơn xskt'
        ]
    },
    
    // XSMN.MOBI
    xsmnmobi: {
        brand: ['xsmn.mobi', 'xsmn mobi', 'xsmn247'],
        alternatives: [
            'xsmn.mobi alternative',
            'thay thế xsmn.mobi',
            'tốt hơn xsmn.mobi',
            'ketquamn thay xsmn.mobi',
            'ketquamn tốt hơn xsmn.mobi'
        ],
        comparisons: [
            'xsmn.mobi vs ketquamn',
            'so sánh xsmn.mobi và ketquamn',
            'xsmn.mobi hay ketquamn',
            'ketquamn hay xsmn.mobi'
        ],
        features: [
            'xsmn.mobi kết quả xổ số',
            'xsmn.mobi xsmn',
            'ketquamn xsmn tốt hơn xsmn.mobi',
            'ketquamn xsmn nhanh hơn xsmn.mobi'
        ],
        negatives: [
            'xsmn.mobi chậm',
            'xsmn.mobi lỗi',
            'ketquamn nhanh hơn xsmn.mobi',
            'ketquamn ổn định hơn xsmn.mobi'
        ]
    },
    
    // XOSOTHANTAI
    xosothantai: {
        brand: ['xosothantai.mobi', 'xosothantai', 'xoso than tai'],
        alternatives: [
            'xosothantai.mobi alternative',
            'thay thế xosothantai',
            'tốt hơn xosothantai',
            'ketquamn thay xosothantai',
            'ketquamn tốt hơn xosothantai'
        ],
        comparisons: [
            'xosothantai vs ketquamn',
            'so sánh xosothantai và ketquamn',
            'xosothantai hay ketquamn',
            'ketquamn hay xosothantai'
        ],
        features: [
            'xosothantai soi cầu',
            'xosothantai thống kê',
            'ketquamn soi cầu tốt hơn xosothantai',
            'ketquamn thống kê tốt hơn xosothantai'
        ],
        negatives: [
            'xosothantai chậm',
            'xosothantai lỗi',
            'ketquamn nhanh hơn xosothantai',
            'ketquamn ổn định hơn xosothantai'
        ]
    },
    
    // ATRUNGROI
    atrungroi: {
        brand: ['atrungroi.com', 'a trúng rồi', 'atrungroi'],
        alternatives: [
            'atrungroi.com alternative',
            'thay thế atrungroi',
            'tốt hơn atrungroi',
            'ketquamn thay atrungroi',
            'ketquamn tốt hơn atrungroi'
        ],
        comparisons: [
            'atrungroi vs ketquamn',
            'so sánh atrungroi và ketquamn',
            'atrungroi hay ketquamn',
            'ketquamn hay atrungroi'
        ],
        features: [
            'atrungroi soi cầu',
            'atrungroi dự đoán',
            'ketquamn soi cầu tốt hơn atrungroi',
            'ketquamn dự đoán tốt hơn atrungroi'
        ],
        negatives: [
            'atrungroi chậm',
            'atrungroi lỗi',
            'ketquamn nhanh hơn atrungroi',
            'ketquamn ổn định hơn atrungroi'
        ]
    },
    
    // XSMN247 / XỔ SỐ MINH NGỌC
    xsmn247: {
        brand: ['xsmn247.me', 'xsmn247', 'xổ số minh ngọc 247', 'xo so minh ngoc 247'],
        alternatives: [
            'xsmn247.me alternative',
            'thay thế xsmn247',
            'tốt hơn xsmn247',
            'ketquamn thay xsmn247',
            'ketquamn tốt hơn xsmn247'
        ],
        comparisons: [
            'xsmn247 vs ketquamn',
            'so sánh xsmn247 và ketquamn',
            'xsmn247 hay ketquamn',
            'ketquamn hay xsmn247'
        ],
        features: [
            'xsmn247 kết quả xổ số',
            'xsmn247 xsmn',
            'ketquamn kết quả xổ số tốt hơn xsmn247',
            'ketquamn xsmn nhanh hơn xsmn247'
        ],
        negatives: [
            'xsmn247 chậm',
            'xsmn247 lỗi',
            'ketquamn nhanh hơn xsmn247',
            'ketquamn ổn định hơn xsmn247'
        ]
    },
    
    // KETQUA.NET
    ketqua: {
        brand: ['ketqua.net', 'ketqua', 'ket qua net'],
        alternatives: [
            'ketqua.net alternative',
            'thay thế ketqua.net',
            'tốt hơn ketqua.net',
            'ketquamn thay ketqua.net',
            'ketquamn tốt hơn ketqua.net'
        ],
        comparisons: [
            'ketqua.net vs ketquamn',
            'so sánh ketqua.net và ketquamn',
            'ketqua.net hay ketquamn',
            'ketquamn hay ketqua.net'
        ],
        features: [
            'ketqua.net kết quả xổ số',
            'ketqua.net xsmb',
            'ketquamn kết quả xổ số tốt hơn ketqua.net',
            'ketquamn xsmb nhanh hơn ketqua.net'
        ],
        negatives: [
            'ketqua.net chậm',
            'ketqua.net lỗi',
            'ketquamn nhanh hơn ketqua.net',
            'ketquamn ổn định hơn ketqua.net'
        ]
    }
};

/**
 * Generate competitor keywords for a page
 * @param {string} pageType - Type of page (home, kqxs, soi-cau, etc.)
 * @returns {Array} Array of competitor keywords
 */
export function getCompetitorKeywords(pageType = 'home') {
    const allKeywords = [];
    
    // Add all competitor keywords
    Object.values(COMPETITOR_KEYWORDS).forEach(competitor => {
        allKeywords.push(
            ...competitor.brand,
            ...competitor.alternatives,
            ...competitor.comparisons,
            ...competitor.features,
            ...competitor.negatives
        );
    });
    
    // Add page-specific competitor keywords
    if (pageType === 'kqxs' || pageType === 'ket-qua-xo-so-mien-bac') {
        allKeywords.push(
            'xosodaiphat xsmb',
            'xoso.com.vn xsmb',
            'xskt.com.vn xsmb',
            'ketquamn xsmb tốt hơn xosodaiphat',
            'ketquamn xsmb nhanh hơn xoso.com.vn'
        );
    }
    
    if (pageType === 'soi-cau' || pageType === 'soi-cau-mien-bac-ai') {
        allKeywords.push(
            'xosothantai soi cầu',
            'xskt.com.vn soi cầu',
            'atrungroi soi cầu',
            'ketquamn soi cầu tốt hơn xosothantai',
            'ketquamn soi cầu chính xác hơn xskt'
        );
    }
    
    // Remove duplicates
    return [...new Set(allKeywords)];
}

/**
 * Generate competitor keywords string for meta keywords
 * @param {string} pageType - Type of page
 * @returns {string} Comma-separated keywords
 */
export function getCompetitorKeywordsString(pageType = 'home') {
    return getCompetitorKeywords(pageType).join(', ');
}

/**
 * Generate competitor comparison structured data
 * @param {string} pageType - Type of page
 * @returns {Object} Structured data for comparison
 */
export function getCompetitorComparisonSchema(pageType = 'home') {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = 'Kết Quả MN | KETQUAMN.COM';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: siteName,
        description: `${siteName} - Kết quả xổ số 3 miền nhanh nhất, chính xác nhất. Tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi.`,
        brand: {
            '@type': 'Brand',
            name: 'Kết Quả MN'
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '2500',
            bestRating: '5',
            worstRating: '1'
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'VND',
            availability: 'https://schema.org/InStock',
            url: siteUrl
        },
        // Comparison with competitors
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Tốc độ',
                value: 'Nhanh hơn xosodaiphat, xoso.com.vn'
            },
            {
                '@type': 'PropertyValue',
                name: 'Độ chính xác',
                value: 'Chính xác 100%, tốt hơn xskt.com.vn'
            },
            {
                '@type': 'PropertyValue',
                name: 'Tính năng',
                value: 'Nhiều tính năng hơn xsmn.mobi, xosothantai'
            }
        ]
    };
}

/**
 * CompetitorSEOKeywords Component
 * Renders hidden competitor keywords for SEO (not visible to users)
 */
export default function CompetitorSEOKeywords({ pageType = 'home' }) {
    const keywords = useMemo(() => getCompetitorKeywords(pageType), [pageType]);
    
    // Don't render anything visible - just for SEO meta tags
    // This component is used by AdvancedSEO to add keywords to meta tags
    return null;
}

// Export for use in other components
export { COMPETITOR_KEYWORDS };












