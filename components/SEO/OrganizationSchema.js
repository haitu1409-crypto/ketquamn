/**
 * Organization Schema Component
 * Structured data for search engines to understand website/organization
 * Helps with brand recognition and rich snippets
 */

import React from 'react';

export default function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Kết Quả MN",
        "alternateName": [
            "KetQuaMN",
            "Tạo Kết Quả MN",
            "Kết Quả MN"
        ],
        "url": "https://ketquamn.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://ketquamn.com/logo1.png",
            "width": 512,
            "height": 512
        },
        "image": "https://ketquamn.com/logo1.png",
        "description": "Kết Quả MN (KETQUAMN.COM) - Kết quả xổ số miền Nam, miền Bắc, miền Trung nhanh nhất, chính xác nhất. XSMN, XSMB, XSMT, KQXSMN, KQXSMB, KQXSMT. Công cụ tạo dàn số, thống kê xổ số 3 miền chuyên nghiệp. Miễn phí 100%.",
        "slogan": "Kết quả xổ số 3 miền nhanh nhất, chính xác nhất",
        "foundingDate": "2024",
        "founder": {
            "@type": "Organization",
            "name": "Kết Quả MN Team"
        },
        "email": "support@ketquamn.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "VN",
            "addressLocality": "Vietnam"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": ["Vietnamese", "vi"],
            "areaServed": "VN"
        },
        "sameAs": [
            "https://facebook.com/taodandewukong",
            "https://youtube.com/@ketquamn",
            "https://tiktok.com/@ketquamn"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "VND",
            "availability": "https://schema.org/InStock",
            "url": "https://ketquamn.com"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}




