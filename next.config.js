/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // ✅ SEO & Performance Optimizations
    poweredByHeader: false,
    compress: true,

    // ✅ Image Optimization
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.ketquamn.com',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'api.taodandewukong.pro',
                pathname: '/uploads/**',
            },
        ],
    },

    // ✅ Security Headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // ✅ Security Headers
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    // ✅ REMOVED: X-XSS-Protection is deprecated and unnecessary (Content-Security-Policy is sufficient)
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                    // ✅ Performance Headers
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=60, stale-while-revalidate=300'
                    }
                ],
            },
        ];
    },

    // ✅ Redirects for SEO
    async redirects() {
        return [
            // Redirect www to non-www (or vice versa) for canonical URLs
            // Add your redirects here
        ];
    },

    // ✅ Experimental Features for Performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', 'date-fns'],
    },

    // ✅ Webpack Optimizations
    webpack: (config, { isServer }) => {
        // Optimize bundle size
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
};

module.exports = nextConfig;
