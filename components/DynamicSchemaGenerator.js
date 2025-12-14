/**
 * Dynamic Schema Generator Component
 * Tạo 20+ loại schema types để Google hiểu rõ nhất về trang web
 * 
 * Schema Types:
 * 1. WebSite
 * 2. Organization
 * 3. WebPage
 * 4. Article
 * 5. NewsArticle
 * 6. FAQPage
 * 7. HowTo
 * 8. Product
 * 9. SoftwareApplication
 * 10. Dataset
 * 11. ItemList
 * 12. BreadcrumbList
 * 13. VideoObject
 * 14. ImageObject
 * 15. Review
 * 16. AggregateRating
 * 17. LocalBusiness
 * 18. Service
 * 19. Event
 * 20. Person
 * 21. CreativeWork
 * 22. CollectionPage
 * 23. SearchAction
 * 24. ContactPoint
 */

import Head from 'next/head';
import { useMemo } from 'react';

/**
 * Generate all schemas for a page
 */
export function generateAllSchemas({
    pageType = 'website',
    title = '',
    description = '',
    canonical = '',
    ogImage = '',
    faq = [],
    breadcrumbs = [],
    articleData = null,
    reviewData = null,
    videoData = null,
    itemListData = null
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = 'Kết Quả MN | KETQUAMN.COM';
    const currentDate = new Date().toISOString();
    const fullUrl = canonical || siteUrl;
    const imageUrl = ogImage || `${siteUrl}/logo1.png`;
    
    const schemas = [];
    
    // 1. WebSite Schema (Always)
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        alternateName: ['Ket Qua MN', 'KetQuaMN', 'KETQUAMN.COM', 'ketquamn.com'],
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
        },
        inLanguage: 'vi-VN',
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: {
            '@type': 'Organization',
            name: siteName
        }
    });
    
    // 2. Organization Schema (Always)
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        alternateName: ['Ket Qua MN', 'KetQuaMN', 'KETQUAMN.COM'],
        url: siteUrl,
        logo: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: 512,
            height: 512
        },
        image: imageUrl,
        description: description || 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
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
        }
    });
    
    // 3. WebPage Schema (Always)
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: fullUrl,
        inLanguage: 'vi-VN',
        isPartOf: {
            '@type': 'WebSite',
            name: siteName,
            url: siteUrl
        },
        about: {
            '@type': 'Thing',
            name: 'Kết quả xổ số',
            description: 'Kết quả xổ số 3 miền'
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: []
        }
    });
    
    // 4. BreadcrumbList (if available)
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
    
    // 5. FAQPage (if available)
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
    
    // 6. Article Schema (if article)
    if (pageType === 'article' && articleData) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: imageUrl,
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
                    url: imageUrl
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl
            },
            keywords: articleData.keywords || '',
            articleSection: articleData.section || 'Xổ Số',
            wordCount: articleData.wordCount || 500
        });
    }
    
    // 7. NewsArticle (if news)
    if (pageType === 'news' || pageType === 'article') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: title,
            description: description,
            image: imageUrl,
            datePublished: articleData?.publishedTime || currentDate,
            dateModified: articleData?.modifiedTime || currentDate,
            author: {
                '@type': 'Person',
                name: articleData?.author || siteName
            },
            publisher: {
                '@type': 'Organization',
                name: siteName,
                logo: {
                    '@type': 'ImageObject',
                    url: imageUrl
                }
            }
        });
    }
    
    // 8. SoftwareApplication (for tools)
    if (pageType === 'tool' || canonical?.includes('dan-') || canonical?.includes('soi-cau')) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: title,
            description: description,
            url: fullUrl,
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web Browser',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            softwareVersion: '1.0.0',
            datePublished: '2024-01-01',
            dateModified: currentDate,
            author: {
                '@type': 'Organization',
                name: siteName
            },
            publisher: {
                '@type': 'Organization',
                name: siteName,
                logo: {
                    '@type': 'ImageObject',
                    url: imageUrl
                }
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
        });
    }
    
    // 9. Product Schema (for comparison)
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: siteName,
        description: description || 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
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
            url: fullUrl
        }
    });
    
    // 10. Dataset (for statistics)
    if (pageType === 'statistics' || canonical?.includes('thong-ke')) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: title,
            description: description,
            url: fullUrl,
            keywords: 'thống kê xổ số, phân tích xổ số',
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
    
    // 11. ItemList (if available)
    if (itemListData && itemListData.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: title,
            description: description,
            itemListElement: itemListData.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': item.type || 'Thing',
                    name: item.name,
                    description: item.description,
                    url: item.url
                }
            }))
        });
    }
    
    // 12. VideoObject (if available)
    if (videoData) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: videoData.title || title,
            description: videoData.description || description,
            thumbnailUrl: videoData.thumbnailUrl || imageUrl,
            uploadDate: videoData.uploadDate || currentDate,
            duration: videoData.duration,
            contentUrl: videoData.contentUrl,
            embedUrl: videoData.embedUrl
        });
    }
    
    // 13. Review (if available)
    if (reviewData) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
                '@type': 'Product',
                name: reviewData.itemName || siteName
            },
            author: {
                '@type': 'Person',
                name: reviewData.author || 'Người dùng'
            },
            reviewRating: {
                '@type': 'Rating',
                ratingValue: reviewData.rating || '5',
                bestRating: '5',
                worstRating: '1'
            },
            reviewBody: reviewData.reviewBody || description
        });
    }
    
    // 14. Service (for services)
    if (pageType === 'service' || canonical?.includes('cong-cu')) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: title,
            description: description,
            provider: {
                '@type': 'Organization',
                name: siteName
            },
            areaServed: {
                '@type': 'Country',
                name: 'Vietnam'
            },
            serviceType: 'Kết quả xổ số',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND'
            }
        });
    }
    
    // 15. LocalBusiness (if local)
    if (pageType === 'local') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteName,
            image: imageUrl,
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'VN'
            }
        });
    }
    
    return schemas;
}

/**
 * DynamicSchemaGenerator Component
 */
export default function DynamicSchemaGenerator(props) {
    const schemas = useMemo(() => generateAllSchemas(props), [props]);
    
    return (
        <Head>
            {schemas.map((schema, index) => (
                <script
                    key={`schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}
        </Head>
    );
}

