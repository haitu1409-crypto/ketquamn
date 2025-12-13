/**
 * Ultimate SEO Component - 2024-2025 Latest Standards
 * 
 * Dựa trên tài liệu chính thức từ:
 * - Google Search Central (2024-2025 updates)
 * - Bing Webmaster Guidelines
 * - Core Web Vitals standards
 * - E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * - Helpful Content System
 * - Page Experience signals
 * 
 * Multi-Search Engine Support:
 * - Google Search
 * - Bing / Microsoft Edge
 * - Yandex
 * - Baidu
 * - Coc Coc (Vietnam)
 * - DuckDuckGo
 */

import Head from 'next/head';
import { useMemo } from 'react';

export default function UltimateSEO({
    // Basic SEO
    title,
    description,
    keywords = '',
    canonical,
    ogImage,
    
    // Page Type
    pageType = 'website',
    
    // E-E-A-T Signals
    author = null,
    authorProfile = null,
    expertise = null,
    experience = null,
    trustworthiness = null,
    
    // Content Quality
    contentQuality = 'high',
    helpfulContent = true,
    originalContent = true,
    
    // Structured Data
    structuredData = [],
    breadcrumbs = [],
    faq = [],
    articleData = null,
    lotteryData = null,
    
    // Performance
    preloadImages = [],
    preconnectDomains = [],
    
    // Security
    csp = null,
    
    // Accessibility
    lang = 'vi',
    
    // Robots
    noindex = false,
    nofollow = false,
    
    // Additional
    customMeta = [],
    customLinks = [],
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = 'Kết Quả MN | KETQUAMN.COM';
    const fullUrl = canonical || siteUrl;
    const ogImageUrl = ogImage || `${siteUrl}/logo1.png`;
    const currentDate = new Date().toISOString();
    const currentYear = new Date().getFullYear();

    // ✅ E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
    const eeatData = useMemo(() => {
        const data = {
            experience: experience || 'Chuyên trang kết quả xổ số với hơn 5 năm kinh nghiệm',
            expertise: expertise || 'Chuyên gia phân tích và thống kê xổ số 3 miền',
            authoritativeness: 'Trang web được tin cậy bởi hàng nghìn người dùng mỗi ngày',
            trustworthiness: trustworthiness || 'Dữ liệu chính xác, cập nhật nhanh, miễn phí 100%'
        };
        
        if (author) {
            data.author = {
                name: author,
                profile: authorProfile || `${siteUrl}/author/${author.toLowerCase().replace(/\s+/g, '-')}`,
                expertise: expertise || 'Chuyên gia xổ số',
                experience: experience || '5+ năm kinh nghiệm'
            };
        }
        
        return data;
    }, [author, authorProfile, expertise, experience, trustworthiness, siteUrl]);

    // ✅ Helpful Content System Signals
    const helpfulContentSignals = useMemo(() => {
        return {
            isHelpful: helpfulContent,
            isOriginal: originalContent,
            quality: contentQuality,
            userIntent: 'informational', // informational, transactional, navigational
            satisfiesUserQuery: true,
            providesValue: true,
            isComprehensive: true,
            isUpToDate: true,
            lastUpdated: currentDate
        };
    }, [helpfulContent, originalContent, contentQuality, currentDate]);

    // ✅ Enhanced Structured Data với E-E-A-T
    const enhancedStructuredData = useMemo(() => {
        const schemas = [];

        // 1. WebSite Schema với SearchAction (Google Sitelinks)
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
            copyrightYear: currentYear,
            copyrightHolder: {
                '@type': 'Organization',
                name: siteName
            },
            // ✅ E-E-A-T: Trust signals
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '2500',
                bestRating: '5',
                worstRating: '1'
            }
        });

        // 2. Organization Schema với E-E-A-T
        const organizationSchema = {
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
        };

        // ✅ E-E-A-T: Thêm expertise và trustworthiness
        if (eeatData.expertise) {
            organizationSchema.knowsAbout = [
                'Xổ số miền Nam',
                'Xổ số miền Bắc',
                'Xổ số miền Trung',
                'Thống kê xổ số',
                'Phân tích số liệu'
            ];
        }

        schemas.push(organizationSchema);

        // 3. BreadcrumbList
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

        // 4. FAQPage
        if (faq && faq.length > 0) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faq.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                    }
                }))
            });
        }

        // 5. Article Schema với E-E-A-T
        if (pageType === 'article' && articleData) {
            const articleSchema = {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: title,
                description: description,
                image: ogImageUrl,
                datePublished: articleData.publishedTime || currentDate,
                dateModified: articleData.modifiedTime || currentDate,
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
                wordCount: articleData.wordCount || 500,
                inLanguage: 'vi-VN'
            };

            // ✅ E-E-A-T: Author với expertise
            if (eeatData.author) {
                articleSchema.author = {
                    '@type': 'Person',
                    name: eeatData.author.name,
                    url: eeatData.author.profile,
                    jobTitle: eeatData.author.expertise,
                    knowsAbout: ['Xổ số', 'Thống kê', 'Phân tích số liệu']
                };
            } else {
                articleSchema.author = {
                    '@type': 'Organization',
                    name: siteName
                };
            }

            schemas.push(articleSchema);
        }

        // 6. Dataset Schema - Only if explicitly needed
        if (pageType === 'dataset' && lotteryData) {
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
                temporalCoverage: `${currentYear}-01-01/..`,
                spatialCoverage: {
                    '@type': 'Place',
                    name: 'Vietnam'
                }
            });
        }

        // 7. ItemList Schema - Only if explicitly needed
        if (pageType === 'collection' && lotteryData?.items?.length > 0) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: title,
                description: description,
                itemListElement: lotteryData.items.slice(0, 10).map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'GameResult',
                        name: item.name,
                        datePublished: item.date
                    }
                }))
            });
        }

        // 8. HowTo Schema - Only if explicitly needed
        if (pageType === 'howto' && articleData?.steps?.length > 0) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: title,
                description: description,
                image: ogImageUrl,
                step: articleData.steps.slice(0, 10).map((step, index) => ({
                    '@type': 'HowToStep',
                    position: index + 1,
                    name: step.name,
                    text: step.text
                }))
            });
        }

        // 9. VideoObject Schema - Only if explicitly needed
        if (articleData?.video?.url) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'VideoObject',
                name: title,
                description: description,
                thumbnailUrl: articleData.video.thumbnail || ogImageUrl,
                uploadDate: articleData.video.uploadDate || currentDate,
                contentUrl: articleData.video.url
            });
        }

        // Merge với structured data từ props
        return [...schemas, ...(Array.isArray(structuredData) ? structuredData : [structuredData].filter(Boolean))];
    }, [
        title, description, keywords, canonical, ogImage, pageType, structuredData, 
        breadcrumbs, faq, articleData, lotteryData, siteUrl, siteName, fullUrl, 
        ogImageUrl, currentDate, currentYear, eeatData
    ]);

    // ✅ Multi-Search Engine Meta Tags
    const robotsContent = useMemo(() => {
        const directives = [];
        if (noindex) directives.push('noindex');
        else directives.push('index');
        
        if (nofollow) directives.push('nofollow');
        else directives.push('follow');
        
        directives.push('max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1');
        
        return directives.join(', ');
    }, [noindex, nofollow]);

    return (
        <Head>
            {/* ===== BASIC META TAGS ===== */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author || siteName} />
            
            {/* ===== ROBOTS - Multi-Search Engine ===== */}
            <meta name="robots" content={robotsContent} />
            <meta name="googlebot" content={robotsContent} />
            <meta name="bingbot" content={robotsContent} />
            <meta name="coccocbot" content={robotsContent} />
            <meta name="yandexbot" content={noindex ? "noindex,nofollow" : "index, follow"} />
            <meta name="baiduspider" content={noindex ? "noindex,nofollow" : "index, follow"} />
            <meta name="slurp" content={noindex ? "noindex,nofollow" : "index, follow"} />
            <meta name="duckduckbot" content={robotsContent} />

            {/* ===== SEARCH ENGINE VERIFICATION ===== */}
            <meta name="google-site-verification" content="OniUNDUrgOZ4Fou_Thz9y9_TgDX4INuKAklFmpG-a6k" />
            <meta name="msvalidate.01" content="" />
            <meta name="yandex-verification" content="" />
            <meta name="baidu-site-verification" content="" />
            <meta name="coccoc-site-verification" content="" />

            {/* ===== ✅ E-E-A-T META TAGS ===== */}
            {eeatData.author && (
                <>
                    <meta name="author" content={eeatData.author.name} />
                    <meta name="article:author" content={eeatData.author.name} />
                    <meta name="article:author:profile" content={eeatData.author.profile} />
                </>
            )}
            {eeatData.expertise && (
                <meta name="expertise" content={eeatData.expertise} />
            )}
            {eeatData.experience && (
                <meta name="experience" content={eeatData.experience} />
            )}

            {/* ===== ✅ HELPFUL CONTENT SIGNALS ===== */}
            <meta name="content-quality" content={helpfulContentSignals.quality} />
            <meta name="content-original" content={helpfulContentSignals.isOriginal ? 'yes' : 'no'} />
            <meta name="content-helpful" content={helpfulContentSignals.isHelpful ? 'yes' : 'no'} />
            <meta name="content-updated" content={helpfulContentSignals.lastUpdated} />

            {/* ===== SEMANTIC META TAGS ===== */}
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

            {/* ===== TWITTER CARDS ===== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />
            <meta name="twitter:image:alt" content={title} />
            <meta name="twitter:site" content="@ketquamn" />
            <meta name="twitter:creator" content="@ketquamn" />

            {/* ===== ✅ BING SPECIFIC ===== */}
            <meta name="msapplication-TileImage" content={ogImageUrl} />
            <meta name="msapplication-TileColor" content="#FF6B35" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* ===== ✅ YANDEX SPECIFIC ===== */}
            <meta name="yandex-verification" content="" />

            {/* ===== ✅ BAIDU SPECIFIC ===== */}
            <meta name="baidu-site-verification" content="" />

            {/* ===== ✅ COC COC SPECIFIC (Vietnam) ===== */}
            <meta name="coccoc-site-verification" content="" />

            {/* ===== STRUCTURED DATA ===== */}
            {enhancedStructuredData.map((schema, index) => (
                <script
                    key={`structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}

            {/* ===== ✅ PERFORMANCE HINTS ===== */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            
            {/* Preconnect to custom domains */}
            {preconnectDomains.map((domain, index) => (
                <link key={`preconnect-${index}`} rel="preconnect" href={domain} />
            ))}

            {/* Preload critical images */}
            {preloadImages.map((image, index) => (
                <link 
                    key={`preload-${index}`} 
                    rel="preload" 
                    as="image" 
                    href={image.url}
                    fetchPriority={image.priority || 'high'}
                />
            ))}

            {/* ===== THEME COLOR ===== */}
            <meta name="theme-color" content="#FF6B35" />
            <meta name="msapplication-TileColor" content="#FF6B35" />

            {/* ===== ✅ MOBILE OPTIMIZATION ===== */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Kết Quả MN" />

            {/* ===== ✅ SECURITY HEADERS ===== */}
            {/* Note: Security headers are set via HTTP headers in vercel.json, not meta tags */}
            {/* X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy are configured in vercel.json */}

            {/* ===== ✅ ACCESSIBILITY ===== */}
            {/* Note: lang attribute is set in _document.js <Html lang="vi"> - do not duplicate here */}

            {/* ===== CUSTOM META TAGS ===== */}
            {customMeta.map((meta, index) => (
                <meta key={`custom-meta-${index}`} {...meta} />
            ))}

            {/* ===== CUSTOM LINKS ===== */}
            {customLinks.map((link, index) => (
                <link key={`custom-link-${index}`} {...link} />
            ))}
        </Head>
    );
}

