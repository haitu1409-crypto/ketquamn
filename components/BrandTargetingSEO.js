/**
 * Brand Targeting SEO Component
 * 
 * Chiến lược để xuất hiện khi người dùng tìm kiếm tên các trang web nổi tiếng
 * Kỹ thuật an toàn: So sánh, thay thế, alternative
 * 
 * Target brands:
 * - ketqua04.net / ketqua.net
 * - xosodaiphat.com
 * - xoso.com.vn
 * - xskt.com.vn
 * - xsmn.mobi
 */

import Head from 'next/head';
import { useMemo, Fragment } from 'react';

const TARGET_BRANDS = {
    'ketqua04.net': {
        name: 'ketqua04.net',
        variations: [
            'ketqua04.net',
            'ketqua04',
            'ketqua.net',
            'ketqua 04',
            'ket qua 04',
            'ket qua net',
            'ketqua net'
        ],
        comparisonKeywords: [
            'ketqua04.net alternative',
            'thay thế ketqua04.net',
            'ketqua04.net tốt hơn',
            'ketqua04.net vs ketquamn',
            'so sánh ketqua04.net',
            'ketqua04.net thay thế',
            'tốt hơn ketqua04.net',
            'ketqua04.net miễn phí',
            'ketqua04.net nhanh hơn'
        ],
        lsiKeywords: [
            'ketqua04.net kết quả xổ số',
            'ketqua04.net xsmn',
            'ketqua04.net xsmb',
            'ketqua04.net tra cứu',
            'ketqua04.net hôm nay',
            'ketqua04.net mới nhất'
        ]
    },
    'xosodaiphat.com': {
        name: 'xosodaiphat.com',
        variations: [
            'xosodaiphat.com',
            'xosodaiphat',
            'xo so dai phat',
            'xổ số đại phát',
            'xosodaiphat com'
        ],
        comparisonKeywords: [
            'xosodaiphat.com alternative',
            'thay thế xosodaiphat.com',
            'xosodaiphat.com tốt hơn',
            'xosodaiphat.com vs ketquamn',
            'so sánh xosodaiphat.com',
            'tốt hơn xosodaiphat.com',
            'xosodaiphat.com miễn phí',
            'xosodaiphat.com nhanh hơn'
        ],
        lsiKeywords: [
            'xosodaiphat.com kết quả xổ số',
            'xosodaiphat.com xsmn',
            'xosodaiphat.com xsmb',
            'xosodaiphat.com tra cứu',
            'xosodaiphat.com hôm nay'
        ]
    },
    'xoso.com.vn': {
        name: 'xoso.com.vn',
        variations: [
            'xoso.com.vn',
            'xoso com vn',
            'xo so com vn',
            'xổ số com vn'
        ],
        comparisonKeywords: [
            'xoso.com.vn alternative',
            'thay thế xoso.com.vn',
            'xoso.com.vn tốt hơn',
            'xoso.com.vn vs ketquamn',
            'so sánh xoso.com.vn',
            'tốt hơn xoso.com.vn',
            'xoso.com.vn miễn phí',
            'xoso.com.vn nhanh hơn'
        ],
        lsiKeywords: [
            'xoso.com.vn kết quả xổ số',
            'xoso.com.vn xsmn',
            'xoso.com.vn xsmb',
            'xoso.com.vn tra cứu',
            'xoso.com.vn hôm nay'
        ]
    },
    'xskt.com.vn': {
        name: 'xskt.com.vn',
        variations: [
            'xskt.com.vn',
            'xskt com vn',
            'xo so kien thiet',
            'xổ số kiến thiết'
        ],
        comparisonKeywords: [
            'xskt.com.vn alternative',
            'thay thế xskt.com.vn',
            'xskt.com.vn tốt hơn',
            'xskt.com.vn vs ketquamn',
            'so sánh xskt.com.vn',
            'tốt hơn xskt.com.vn'
        ],
        lsiKeywords: [
            'xskt.com.vn kết quả xổ số',
            'xskt.com.vn xsmn',
            'xskt.com.vn xsmb',
            'xskt.com.vn tra cứu'
        ]
    },
    'xsmn.mobi': {
        name: 'xsmn.mobi',
        variations: [
            'xsmn.mobi',
            'xsmn mobi',
            'xsmn mobile'
        ],
        comparisonKeywords: [
            'xsmn.mobi alternative',
            'thay thế xsmn.mobi',
            'xsmn.mobi tốt hơn',
            'xsmn.mobi vs ketquamn',
            'so sánh xsmn.mobi',
            'tốt hơn xsmn.mobi'
        ],
        lsiKeywords: [
            'xsmn.mobi kết quả xổ số',
            'xsmn.mobi xsmn',
            'xsmn.mobi tra cứu',
            'xsmn.mobi hôm nay'
        ]
    }
};

/**
 * Generate all brand targeting keywords
 */
export function getAllBrandTargetingKeywords() {
    const keywords = [];
    
    Object.values(TARGET_BRANDS).forEach(brand => {
        keywords.push(...brand.variations);
        keywords.push(...brand.comparisonKeywords);
        keywords.push(...brand.lsiKeywords);
    });
    
    return [...new Set(keywords)];
}

/**
 * Generate meta description with brand targeting
 */
export function generateBrandTargetingDescription(brandName) {
    const brand = TARGET_BRANDS[brandName];
    if (!brand) return null;
    
    return `Kết Quả MN (KETQUAMN.COM) - Thay thế ${brand.name}, tốt hơn ${brand.name}. 
    Kết quả xổ số 3 miền nhanh nhất, chính xác nhất. XSMN, XSMB, XSMT. 
    Miễn phí 100%, cập nhật trực tiếp, giao diện thân thiện. 
    So sánh ${brand.name} vs ketquamn.com - Lựa chọn tốt hơn cho bạn.`;
}

/**
 * Brand Targeting SEO Component
 */
export default function BrandTargetingSEO({
    targetBrands = ['ketqua04.net', 'xosodaiphat.com', 'xoso.com.vn'],
    includeComparison = true
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    
    // Generate all brand targeting keywords
    const brandKeywords = useMemo(() => {
        const keywords = [];
        
        targetBrands.forEach(brandName => {
            const brand = TARGET_BRANDS[brandName];
            if (brand) {
                keywords.push(...brand.variations);
                if (includeComparison) {
                    keywords.push(...brand.comparisonKeywords);
                }
                keywords.push(...brand.lsiKeywords);
            }
        });
        
        return [...new Set(keywords)].join(', ');
    }, [targetBrands, includeComparison]);
    
    // Generate structured data for comparison
    const comparisonStructuredData = useMemo(() => {
        if (!includeComparison) return null;
        
        const comparisons = targetBrands.map(brandName => {
            const brand = TARGET_BRANDS[brandName];
            if (!brand) return null;
            
            return {
                '@type': 'Product',
                name: `Kết Quả MN - Thay thế ${brand.name}`,
                description: `Kết Quả MN là lựa chọn tốt hơn so với ${brand.name}. 
                Cung cấp kết quả xổ số 3 miền nhanh nhất, chính xác nhất, miễn phí 100%.`,
                brand: {
                    '@type': 'Brand',
                    name: 'Kết Quả MN | KETQUAMN.COM'
                },
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'VND',
                    availability: 'https://schema.org/InStock'
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '2500',
                    bestRating: '5',
                    worstRating: '1'
                }
            };
        }).filter(Boolean);
        
        if (comparisons.length === 0) return null;
        
        return {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'So sánh các trang kết quả xổ số',
            description: 'So sánh Kết Quả MN với các trang kết quả xổ số hàng đầu',
            itemListElement: comparisons.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: item
            }))
        };
    }, [targetBrands, includeComparison]);
    
    return (
        <Head>
            {/* Brand Targeting Keywords */}
            <meta name="keywords" content={brandKeywords} />
            
            {/* Brand Targeting Meta Tags */}
            {targetBrands.map(brandName => {
                const brand = TARGET_BRANDS[brandName];
                if (!brand) return null;
                
                return (
                    <Fragment key={brandName}>
                        <meta name={`alternative-to-${brandName.replace(/\./g, '-')}`} content="yes" />
                        <meta name={`better-than-${brandName.replace(/\./g, '-')}`} content="yes" />
                    </Fragment>
                );
            })}
            
            {/* Comparison Structured Data */}
            {comparisonStructuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(comparisonStructuredData)
                    }}
                />
            )}
        </Head>
    );
}

// Export TARGET_BRANDS separately since it's not exported inline
export { TARGET_BRANDS };

