/**
 * Rich Snippets Optimizer Component
 * Tối ưu Rich Snippets để tăng CTR từ SERP
 * 
 * Kỹ thuật:
 * - FAQPage schema (Featured Snippets)
 * - HowTo schema (Step-by-step guides)
 * - Review schema (Ratings & reviews)
 * - VideoObject schema (Video tutorials)
 * - BreadcrumbList (Navigation)
 * - Article schema (News articles)
 */

import { useMemo } from 'react';
import Head from 'next/head';

/**
 * Generate FAQPage Schema
 * Tối ưu cho Featured Snippets (Position 0)
 */
export function generateFAQSchema(faqs = []) {
    if (!faqs || faqs.length === 0) return null;
    
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

/**
 * Generate HowTo Schema
 * Tối ưu cho step-by-step guides
 */
export function generateHowToSchema({ title, description, steps = [] }) {
    if (!steps || steps.length === 0) return null;
    
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description: description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            image: step.image || undefined,
            url: step.url || undefined
        }))
    };
}

/**
 * Generate Review Schema
 * Tối ưu cho ratings & reviews
 */
export function generateReviewSchema({ 
    itemName, 
    rating = 4.9, 
    reviewCount = 2500,
    bestRating = 5,
    worstRating = 1 
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: itemName,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.toString(),
            reviewCount: reviewCount.toString(),
            bestRating: bestRating.toString(),
            worstRating: worstRating.toString()
        }
    };
}

/**
 * Generate VideoObject Schema
 * Tối ưu cho video content
 */
export function generateVideoSchema({
    title,
    description,
    thumbnailUrl,
    videoUrl,
    uploadDate,
    duration
}) {
    if (!videoUrl) return null;
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: title,
        description: description,
        thumbnailUrl: thumbnailUrl || `${siteUrl}/logo1.png`,
        uploadDate: uploadDate || new Date().toISOString(),
        duration: duration,
        contentUrl: videoUrl,
        embedUrl: videoUrl
    };
}

/**
 * Generate Article Schema
 * Tối ưu cho news articles
 */
export function generateArticleSchema({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    publisher
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteName = publisher || 'Kết Quả MN | KETQUAMN.COM';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: headline,
        description: description,
        image: image || `${siteUrl}/logo1.png`,
        datePublished: datePublished || new Date().toISOString(),
        dateModified: dateModified || new Date().toISOString(),
        author: {
            '@type': 'Person',
            name: author || siteName
        },
        publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo1.png`
            }
        }
    };
}

/**
 * Generate ItemList Schema
 * Tối ưu cho list content (Top 10, Best of, etc.)
 */
export function generateItemListSchema({
    name,
    description,
    items = []
}) {
    if (!items || items.length === 0) return null;
    
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: name,
        description: description,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': item.type || 'Thing',
                name: item.name,
                description: item.description,
                url: item.url
            }
        }))
    };
}

/**
 * RichSnippetsOptimizer Component
 * Renders all rich snippets schemas
 */
export default function RichSnippetsOptimizer({
    faqs = [],
    howTo = null,
    review = null,
    video = null,
    article = null,
    itemList = null
}) {
    const schemas = useMemo(() => {
        const allSchemas = [];
        
        // FAQ Schema
        if (faqs && faqs.length > 0) {
            const faqSchema = generateFAQSchema(faqs);
            if (faqSchema) allSchemas.push(faqSchema);
        }
        
        // HowTo Schema
        if (howTo) {
            const howToSchema = generateHowToSchema(howTo);
            if (howToSchema) allSchemas.push(howToSchema);
        }
        
        // Review Schema
        if (review) {
            const reviewSchema = generateReviewSchema(review);
            if (reviewSchema) allSchemas.push(reviewSchema);
        }
        
        // Video Schema
        if (video) {
            const videoSchema = generateVideoSchema(video);
            if (videoSchema) allSchemas.push(videoSchema);
        }
        
        // Article Schema
        if (article) {
            const articleSchema = generateArticleSchema(article);
            if (articleSchema) allSchemas.push(articleSchema);
        }
        
        // ItemList Schema
        if (itemList) {
            const itemListSchema = generateItemListSchema(itemList);
            if (itemListSchema) allSchemas.push(itemListSchema);
        }
        
        return allSchemas;
    }, [faqs, howTo, review, video, article, itemList]);
    
    if (schemas.length === 0) return null;
    
    return (
        <Head>
            {schemas.map((schema, index) => (
                <script
                    key={`rich-snippet-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}
        </Head>
    );
}

