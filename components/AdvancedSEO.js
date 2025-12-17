/**
 * Advanced SEO Component
 * Kết hợp White Hat SEO và Gray Hat SEO an toàn
 * Dựa trên phân tích các trang xổ số hàng đầu: xosodaiphat.com, xoso.com.vn
 * 
 * White Hat Techniques:
 * - Rich Structured Data (Schema.org)
 * - Semantic HTML
 * - Internal Linking
 * - Content Optimization
 * - Mobile-First
 * 
 * Gray Hat Techniques (An toàn):
 * - Keyword Density Optimization
 * - LSI Keywords
 * - Latent Semantic Indexing
 * - Content Clustering
 * - Topic Clusters
 */

import Head from 'next/head';
import { useMemo } from 'react';
import { getCompetitorKeywords, getCompetitorComparisonSchema } from './CompetitorSEOKeywords';
import RichSnippetsOptimizer from './RichSnippetsOptimizer';

export default function AdvancedSEO({
    title,
    description,
    keywords = '',
    canonical,
    ogImage,
    pageType = 'website',
    structuredData = [],
    breadcrumbs = [],
    faq = [],
    articleData = null,
    lotteryData = null,
    noindex = false,
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = 'Kết Quả MN | KETQUAMN.COM';
    const fullUrl = canonical || siteUrl;
    const ogImageUrl = ogImage || `${siteUrl}/logo1.png`;
    const currentDate = new Date().toISOString();

    // ✅ WHITE HAT: Tính toán keyword density
    const keywordDensity = useMemo(() => {
        if (!keywords) return {};
        const keywordArray = keywords.split(',').map(k => k.trim().toLowerCase());
        const density = {};
        keywordArray.forEach(keyword => {
            const words = keyword.split(' ');
            words.forEach(word => {
                density[word] = (density[word] || 0) + 1;
            });
        });
        return density;
    }, [keywords]);

    // ✅ GRAY HAT: LSI Keywords (Latent Semantic Indexing) - Mở rộng với nhiều variations
    const lsiKeywords = useMemo(() => {
        if (!keywords) return [];
        const baseKeywords = keywords.split(',').map(k => k.trim()).filter(Boolean);
        const lsi = [];
        
        // Thêm các từ liên quan ngữ nghĩa
        baseKeywords.forEach(keyword => {
            const lower = keyword.toLowerCase();
            
            // Kết quả xổ số
            if (lower.includes('kết quả') || lower.includes('ket qua')) {
                lsi.push(
                    'tra cứu kết quả', 'xem kết quả', 'kết quả mới nhất', 'kết quả hôm nay',
                    'ket qua moi nhat', 'ket qua hom nay', 'ket qua xo so', 'ket qua xs',
                    'kqxs', 'kq xs', 'ket qua', 'ketqua', 'kết quả', 'ket qua xo so',
                    'xem ket qua', 'tra cuu ket qua', 'ket qua nhanh nhat', 'ket qua chinh xac'
                );
            }
            
            // Xổ số miền
            if (lower.includes('miền nam') || lower.includes('mien nam')) {
                lsi.push(
                    'xsmn', 'kqxsmn', 'sxmn', 'xổ số miền nam', 'xo so mien nam',
                    'xsmn hom nay', 'xsmn ngay hom nay', 'ket qua xsmn', 'ket qua xsmn hom nay',
                    'xsmn moi nhat', 'xsmn nhanh nhat', 'xsmn chinh xac', 'xsmn 30 ngay'
                );
            }
            if (lower.includes('miền bắc') || lower.includes('mien bac')) {
                lsi.push(
                    'xsmb', 'kqxsmb', 'sxmb', 'xổ số miền bắc', 'xo so mien bac',
                    'xsmb hom nay', 'xsmb ngay hom nay', 'ket qua xsmb', 'ket qua xsmb hom nay',
                    'xsmb moi nhat', 'xsmb nhanh nhat', 'xsmb chinh xac', 'xsmb 30 ngay',
                    'xstd', 'xo so thu do', 'xổ số thủ đô'
                );
            }
            if (lower.includes('miền trung') || lower.includes('mien trung')) {
                lsi.push(
                    'xsmt', 'kqxsmt', 'sxmt', 'xổ số miền trung', 'xo so mien trung',
                    'xsmt hom nay', 'xsmt ngay hom nay', 'ket qua xsmt', 'ket qua xsmt hom nay',
                    'xsmt moi nhat', 'xsmt nhanh nhat', 'xsmt chinh xac', 'xsmt 30 ngay'
                );
            }
            
            // Thống kê
            if (lower.includes('thống kê') || lower.includes('thong ke')) {
                lsi.push(
                    'phân tích', 'số liệu', 'bảng thống kê', 'thống kê chi tiết',
                    'thong ke xo so', 'thong ke xs', 'thong ke 3 mien', 'thong ke chuyen sau',
                    'phan tich xo so', 'so lieu xo so', 'bang thong ke', 'thong ke chi tiet'
                );
            }
            
            // Soi cầu
            if (lower.includes('soi cầu') || lower.includes('soi cau')) {
                lsi.push(
                    'soi cau', 'soi cầu', 'soi cau chinh xac', 'soi cau mien phi',
                    'soi cau vip', 'soi cau mb', 'soi cau mn', 'soi cau mt',
                    'du doan xo so', 'du doan ket qua', 'chot so', 'chốt số'
                );
            }
        });
        
        // Thêm các LSI keywords chung cho tất cả pages
        lsi.push(
            'xo so', 'xổ số', 'xoso', 'xosố', 'xo so kien thiet', 'xổ số kiến thiết',
            'ket qua', 'ketqua', 'kết quả', 'kqxs', 'kq xs', 'kqxsmn', 'kqxsmb', 'kqxsmt',
            'xsmn', 'xsmb', 'xsmt', 'sxmn', 'sxmb', 'sxmt',
            'ket qua xo so hom nay', 'ket qua xo so moi nhat', 'ket qua xo so nhanh nhat',
            'xem ket qua xo so', 'tra cuu ket qua xo so', 'ket qua xo so chinh xac',
            'ket qua xo so 3 mien', 'ket qua xo so mien nam', 'ket qua xo so mien bac',
            'ket qua xo so mien trung', 'ket qua xo so hôm nay', 'ket qua xo so ngay hom nay'
        );
        
        return [...new Set(lsi)]; // Remove duplicates
    }, [keywords]);

    // ✅ WHITE HAT: Enhanced Structured Data
    const enhancedStructuredData = useMemo(() => {
        const schemas = [];

        // 1. WebSite Schema với SearchAction (cho Google Sitelinks)
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteName,
            alternateName: ['Ket Qua MN', 'KetQuaMN', 'KETQUAMN.COM'],
            url: siteUrl,
            description: description,
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
                    url: `${siteUrl}/logo1.png`,
                    width: 512,
                    height: 512
                }
            },
            inLanguage: 'vi-VN',
            copyrightYear: new Date().getFullYear(),
            copyrightHolder: {
                '@type': 'Organization',
                name: siteName
            }
        });

        // 2. Organization Schema (Enhanced)
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteName,
            alternateName: ['Ket Qua MN', 'KetQuaMN', 'KETQUAMN.COM'],
            url: siteUrl,
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo1.png`,
                width: 512,
                height: 512
            },
            image: `${siteUrl}/logo1.png`,
            description: 'Kết Quả MN - Kết quả xổ số 3 miền nhanh nhất, chính xác nhất. XSMN, XSMB, XSMT, KQXSMN, KQXSMB, KQXSMT.',
            foundingDate: '2024',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'VN',
                addressLocality: 'Vietnam'
            },
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['Vietnamese', 'vi'],
                areaServed: 'VN'
            },
            sameAs: [
                'https://www.facebook.com/ketquamn',
                'https://www.youtube.com/@ketquamn',
                'https://www.tiktok.com/@ketquamn'
            ],
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
            }
        });

        // 3. BreadcrumbList (nếu có)
        if (breadcrumbs && breadcrumbs.length > 0) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: breadcrumbs.map((crumb, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: crumb.name,
                    item: crumb.url
                }))
            });
        }

        // 4. FAQPage - REMOVED: Đã được xử lý bởi DynamicSchemaGenerator để tránh trùng lặp
        // FAQPage schema chỉ nên được tạo một lần duy nhất trên mỗi trang

        // 5. Article Schema (nếu là article)
        if (pageType === 'article' && articleData) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: title,
                description: description,
                image: ogImageUrl,
                datePublished: articleData.publishedTime || currentDate,
                dateModified: articleData.modifiedTime || currentDate,
                author: {
                    '@type': 'Person',
                    name: articleData.author || siteName
                },
                publisher: {
                    '@type': 'Organization',
                    name: siteName,
                    logo: {
                        '@type': 'ImageObject',
                        url: `${siteUrl}/logo1.png`
                    }
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': fullUrl
                },
                keywords: keywords,
                articleSection: articleData.section || 'Xổ Số',
                wordCount: articleData.wordCount || 500
            });
        }

        // 6. Dataset Schema (cho trang thống kê)
        if (pageType === 'dataset' || lotteryData) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'Dataset',
                name: title,
                description: description,
                url: fullUrl,
                keywords: keywords,
                license: 'https://creativecommons.org/licenses/by/4.0/',
                creator: {
                    '@type': 'Organization',
                    name: siteName
                },
                publisher: {
                    '@type': 'Organization',
                    name: siteName
                },
                temporalCoverage: `${new Date().getFullYear()}-01-01/..`,
                spatialCoverage: {
                    '@type': 'Place',
                    name: 'Vietnam'
                }
            });
        }

        // 7. ItemList Schema (cho danh sách kết quả)
        if (pageType === 'collection' || lotteryData) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: title,
                description: description,
                itemListElement: lotteryData?.items?.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'GameResult',
                        name: item.name,
                        datePublished: item.date
                    }
                })) || []
            });
        }

        // 8. Service Schema (cho tất cả pages - tăng CTR)
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Kết Quả Xổ Số Online',
            provider: {
                '@type': 'Organization',
                name: siteName,
                url: siteUrl,
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo1.png`
                }
            },
            areaServed: {
                '@type': 'Country',
                name: 'Vietnam'
            },
            description: 'Dịch vụ cung cấp kết quả xổ số 3 miền (miền Bắc, miền Nam, miền Trung) nhanh nhất, chính xác nhất. Tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi, ketqua.net. Công cụ tạo dàn đề, soi cầu, thống kê xổ số chuyên nghiệp. Miễn phí 100%.',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND',
                availability: 'https://schema.org/InStock',
                url: siteUrl
            }
        });

        // 9. LocalBusiness Schema (cho tất cả pages - tăng CTR)
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteName,
            alternateName: ['Ket Qua MN', 'KetQuaMN', 'KETQUAMN.COM'],
            image: `${siteUrl}/logo1.png`,
            url: siteUrl,
            description: description,
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'VN',
                addressLocality: 'Vietnam'
            },
            telephone: '+84',
            priceRange: 'Miễn phí',
            openingHours: 'Mo-Su 00:00-23:59',
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '2500',
                bestRating: '5',
                worstRating: '1'
            }
        });

        // ✅ COMPETITOR TARGETING: Add competitor comparison schema
        const competitorSchema = getCompetitorComparisonSchema(pageType);
        if (competitorSchema) {
            schemas.push(competitorSchema);
        }
        
        // Merge với structured data từ props
        return [...schemas, ...(Array.isArray(structuredData) ? structuredData : [structuredData].filter(Boolean))];
    }, [title, description, keywords, canonical, ogImage, pageType, structuredData, breadcrumbs, faq, articleData, lotteryData, siteUrl, siteName, fullUrl, ogImageUrl, currentDate]);

    // ✅ COMPETITOR TARGETING: Thêm competitor keywords
    const competitorKeywords = useMemo(() => {
        try {
            // Extract pageType from canonical URL or use default
            const pageType = canonical?.includes('soi-cau') ? 'soi-cau' : 
                            canonical?.includes('ket-qua-xo-so') ? 'kqxs' : 'home';
            return getCompetitorKeywords(pageType);
        } catch (error) {
            console.warn('Error getting competitor keywords:', error);
            return [];
        }
    }, [canonical]);
    
    // ✅ GRAY HAT: Meta keywords với LSI + Competitor keywords
    const enhancedKeywords = useMemo(() => {
        const baseKeywords = keywords ? keywords.split(',').map(k => k.trim()) : [];
        const combined = [...baseKeywords, ...lsiKeywords, ...competitorKeywords];
        return [...new Set(combined)].join(', ');
    }, [keywords, lsiKeywords, competitorKeywords]);

    return (
        <Head>
            {/* ===== BASIC META TAGS ===== */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={enhancedKeywords} />
            <meta name="author" content={siteName} />
            <meta name="robots" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="bingbot" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="coccocbot" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="yandexbot" content={noindex ? "noindex,nofollow" : "index, follow"} />
            <meta name="slurp" content={noindex ? "noindex,nofollow" : "index, follow"} />

            {/* ===== SEARCH ENGINE VERIFICATION ===== */}
            <meta name="google-site-verification" content="OniUNDUrgOZ4Fou_Thz9y9_TgDX4INuKAklFmpG-a6k" />
            <meta name="msvalidate.01" content="" />
            <meta name="yandex-verification" content="" />
            <meta name="baidu-site-verification" content="" />

            {/* ===== WHITE HAT: Semantic Meta Tags ===== */}
            <meta name="language" content="Vietnamese" />
            <meta name="geo.region" content="VN" />
            <meta name="geo.placename" content="Vietnam" />
            <meta name="geo.position" content="16.0544;108.2772" />
            <meta name="ICBM" content="16.0544, 108.2772" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />
            <meta name="revisit-after" content="1 days" />
            <meta name="copyright" content={siteName} />
            <meta name="generator" content="Next.js" />
            <meta name="format-detection" content="telephone=no" />

            {/* ===== CANONICAL URL ===== */}
            <link rel="canonical" href={fullUrl} />

            {/* ===== ALTERNATE LANGUAGES ===== */}
            <link rel="alternate" hrefLang="vi" href={fullUrl} />
            <link rel="alternate" hrefLang="vi-VN" href={fullUrl} />
            <link rel="alternate" hrefLang="x-default" href={fullUrl} />

            {/* ===== OPEN GRAPH (Enhanced) ===== */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:secure_url" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:locale:alternate" content="vi_VN" />
            <meta property="og:updated_time" content={currentDate} />

            {/* Article specific OG */}
            {articleData && (
                <>
                    <meta property="article:published_time" content={articleData.publishedTime || currentDate} />
                    <meta property="article:modified_time" content={articleData.modifiedTime || currentDate} />
                    <meta property="article:author" content={articleData.author || siteName} />
                    <meta property="article:section" content={articleData.section || 'Xổ Số'} />
                    {articleData.tags && articleData.tags.map(tag => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* ===== TWITTER CARDS (Enhanced) ===== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />
            <meta name="twitter:image:alt" content={title} />
            <meta name="twitter:site" content="@ketquamn" />
            <meta name="twitter:creator" content="@ketquamn" />
            <meta name="twitter:label1" content="Loại trang" />
            <meta name="twitter:data1" content="Kết Quả Xổ Số" />
            <meta name="twitter:label2" content="Miễn phí" />
            <meta name="twitter:data2" content="100%" />

            {/* ===== STRUCTURED DATA (Enhanced) ===== */}
            {enhancedStructuredData.map((schema, index) => (
                <script
                    key={`structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}

            {/* ===== PERFORMANCE HINTS ===== */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* ===== THEME COLOR ===== */}
            <meta name="theme-color" content="#FF6B35" />
            <meta name="msapplication-TileColor" content="#FF6B35" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* ===== MOBILE OPTIMIZATION ===== */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Kết Quả MN" />
            
            {/* ===== RICH SNIPPETS OPTIMIZER ===== */}
            <RichSnippetsOptimizer
                faqs={faq}
                review={{
                    itemName: siteName,
                    rating: 4.9,
                    reviewCount: 2500,
                    bestRating: 5,
                    worstRating: 1
                }}
            />
        </Head>
    );
}

