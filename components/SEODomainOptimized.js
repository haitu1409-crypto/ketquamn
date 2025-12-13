import Head from 'next/head';

export default function SEODomainOptimized({
  title = 'Kết Quả MN - Kết quả xổ số miền Nam',
  description = 'Công cụ tạo dàn đề và thống kê xổ số 3 miền chuyên nghiệp - Kết Quả MN. Miễn phí, nhanh chóng, chính xác 100%.',
  keywords = 'tạo dàn đề, thống kê xổ số, 3 miền, lô số, dàn 2D, dàn 3D, dàn 4D, Kết Quả MN',
  canonical = '',
  ogImage = '/og-image.png',
  noindex = false
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
  const fullUrl = canonical || siteUrl;
  const fullImageUrl = `${siteUrl}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Dàn Đề Kết Quả MN" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content="index,follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.ketquamn.com" />

      {/* Preconnect for Critical Resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://api.ketquamn.com" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kết Quả MN" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@ketquamn" />
      <meta name="twitter:creator" content="@ketquamn" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Tạo Dàn Đề" />

      {/* Theme Color */}
      <meta name="theme-color" content="#FF6B35" />
      <meta name="msapplication-TileColor" content="#FF6B35" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Performance Hints */}
      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
      <meta name="preload" content="true" />

      {/* Security Headers */}
      {/* Note: Security headers are set via HTTP headers in vercel.json, not meta tags */}

      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Kết Quả MN',
            alternateName: 'Dàn Đề Online',
            description: description,
            url: siteUrl,
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            softwareVersion: '1.0.0',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'VND',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1547',
              bestRating: '5',
              worstRating: '1',
            },
            author: {
              '@type': 'Organization',
              name: 'Dàn Đề Kết Quả MN',
              url: siteUrl,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Dàn Đề Kết Quả MN',
              logo: {
                '@type': 'ImageObject',
                url: fullImageUrl,
              },
            },
            image: {
              '@type': 'ImageObject',
              url: fullImageUrl,
              width: 1200,
              height: 630,
            },
            inLanguage: 'vi-VN',
            potentialAction: {
              '@type': 'UseAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: siteUrl,
              },
            },
          }),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Dàn Đề Kết Quả MN',
            url: siteUrl,
            logo: fullImageUrl,
            description: 'Bộ công cụ tạo dàn đề chuyên nghiệp: 2D, 3D, 4D, Đặc Biệt. Miễn phí, nhanh chóng, chính xác.',
            sameAs: [
              'https://www.facebook.com/taodandewukong',
              'https://t.me/taodandewukong',
              'https://zalo.me/taodandewukong',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              availableLanguage: ['Vietnamese'],
            },
          }),
        }}
      />
    </Head>
  );
}
