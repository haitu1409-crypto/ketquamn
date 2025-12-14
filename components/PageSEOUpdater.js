/**
 * Page SEO Updater Component
 * 
 * Component để cập nhật SEO cho các trang chưa được tối ưu
 * Tự động thêm UltimateSEO, EditorialContent, ComparisonContent
 */

import { memo } from 'react';
import EnhancedSEOHead from './EnhancedSEOHead';
import EditorialContent from './EditorialContent';
import ComparisonContent from './ComparisonContent';
import { InternalLinksSection } from './InternalLinkingSEO';

/**
 * Get page type for SEO
 */
export function getPageTypeFromPath(pathname) {
    if (pathname.includes('/thong-ke') || pathname.includes('/thongke')) {
        return 'thong-ke';
    }
    if (pathname.includes('/dan-')) {
        return 'dan-de';
    }
    if (pathname.includes('/soi-cau')) {
        return 'soi-cau';
    }
    if (pathname.includes('/tin-tuc')) {
        return 'tin-tuc';
    }
    if (pathname.includes('/ket-qua-xo-so')) {
        return 'kqxs';
    }
    return 'home';
}

/**
 * Get SEO config for page type
 */
export function getSEOConfigForPage(pageType, pagePath) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    
    const configs = {
        'thong-ke': {
            title: 'Thống Kê Xổ Số Miền Bắc - Phân Tích Chi Tiết | Kết Quả MN',
            description: 'Thống kê xổ số miền Bắc chuyên sâu: Lô gan, Tần suất, Đầu đuôi, Giải đặc biệt. Phân tích dữ liệu XSMB từ 30-365 ngày. Công cụ thống kê miễn phí, cập nhật hàng ngày.',
            keywords: 'thống kê xổ số, thống kê xsmb, lô gan, tần suất lô tô, đầu đuôi, giải đặc biệt, phân tích xổ số, thống kê xổ số miền bắc',
            canonical: `${siteUrl}${pagePath}`,
            showEditorial: true,
            showComparison: false,
            internalLinksType: 'thong-ke'
        },
        'dan-de': {
            title: 'Tạo Dàn Đề, Tạo Dàn Số Online Miễn Phí | Kết Quả MN',
            description: 'Công cụ tạo dàn đề, tạo dàn số online miễn phí. Dàn 9x-0x, Dàn 2D, Dàn 3D/4D, Dàn đặc biệt. Thuật toán Fisher-Yates chuẩn quốc tế. Tốt hơn kangdh, giaimasohoc.',
            keywords: 'tạo dàn đề, tạo dàn số, dàn đề 9x-0x, dàn 2d, dàn 3d, dàn 4d, tạo dàn số online, công cụ tạo dàn đề',
            canonical: `${siteUrl}${pagePath}`,
            showEditorial: true,
            showComparison: true,
            internalLinksType: 'home'
        },
        'soi-cau': {
            title: 'Soi Cầu Xổ Số Miền Bắc - Dự Đoán Chính Xác | Kết Quả MN',
            description: 'Soi cầu xổ số miền Bắc bằng AI, dự đoán chính xác. Soi cầu lô tô, soi cầu đặc biệt, soi cầu bạch thủ. Phân tích thống kê, dự đoán miễn phí.',
            keywords: 'soi cầu, soi cầu xsmb, soi cầu lô tô, soi cầu đặc biệt, dự đoán xổ số, soi cầu miền bắc, soi cầu ai',
            canonical: `${siteUrl}${pagePath}`,
            showEditorial: true,
            showComparison: false,
            internalLinksType: 'home'
        },
        'tin-tuc': {
            title: 'Tin Tức Xổ Số - Cập Nhật Mới Nhất | Kết Quả MN',
            description: 'Tin tức xổ số mới nhất, cập nhật hàng ngày. Thông tin giải thưởng, kết quả xổ số, phân tích và dự đoán. Đọc tin tức xổ số miễn phí.',
            keywords: 'tin tức xổ số, tin tức xsmb, tin tức xsmn, tin tức xổ số mới nhất, cập nhật xổ số',
            canonical: `${siteUrl}${pagePath}`,
            showEditorial: true,
            showComparison: false,
            internalLinksType: 'home'
        },
        'kqxs': {
            title: 'Kết Quả Xổ Số - Tra Cứu Nhanh Chóng | Kết Quả MN',
            description: 'Kết quả xổ số 3 miền nhanh nhất, chính xác nhất. XSMN, XSMB, XSMT. Tra cứu kết quả xổ số hôm nay, xem kết quả xổ số mới nhất.',
            keywords: 'kết quả xổ số, ket qua xo so, xsmn, xsmb, xsmt, kết quả xổ số hôm nay',
            canonical: `${siteUrl}${pagePath}`,
            showEditorial: true,
            showComparison: false,
            internalLinksType: 'home'
        },
        'home': {
            title: 'Kết Quả MN | KETQUAMN.COM - Kết Quả Xổ Số 3 Miền',
            description: 'Kết Quả MN - Kết quả xổ số 3 miền nhanh nhất, chính xác nhất. XSMN, XSMB, XSMT. Tra cứu, thống kê, soi cầu, tạo dàn đề miễn phí.',
            keywords: 'kết quả xổ số, ket qua xo so, xsmn, xsmb, xsmt',
            canonical: siteUrl,
            showEditorial: true,
            showComparison: true,
            internalLinksType: 'home'
        }
    };
    
    return configs[pageType] || configs['home'];
}

/**
 * Page SEO Wrapper Component
 * Tự động thêm SEO cho các trang chưa được tối ưu
 */
export const PageSEOUpdater = memo(function PageSEOUpdater({
    children,
    pageType,
    pagePath,
    customTitle,
    customDescription,
    customKeywords,
    showEditorial = true,
    showComparison = false,
    showInternalLinks = true,
    comparisonBrand = 'ketqua04.net'
}) {
    const seoConfig = getSEOConfigForPage(pageType, pagePath);
    
    const finalTitle = customTitle || seoConfig.title;
    const finalDescription = customDescription || seoConfig.description;
    const finalKeywords = customKeywords || seoConfig.keywords;
    
    return (
        <>
            {/* ✅ Enhanced SEO Head - Tự động thêm tất cả SEO components */}
            <EnhancedSEOHead
                pageType={pageType}
                customTitle={finalTitle}
                customDescription={finalDescription}
                customKeywords={finalKeywords}
                canonicalUrl={seoConfig.canonical}
            />
            
            {/* Main Content */}
            {children}
            
            {/* ✅ Editorial Content - Thêm giá trị thực sự */}
            {showEditorial && (seoConfig.showEditorial !== false) && (
                <EditorialContent pageType={pageType} />
            )}
            
            {/* ✅ Comparison Content - So sánh với các trang nổi tiếng */}
            {showComparison && (seoConfig.showComparison !== false) && (
                <ComparisonContent targetBrand={comparisonBrand} showFullComparison={true} />
            )}
            
            {/* ✅ Internal Links - Tăng PageRank */}
            {showInternalLinks && (
                <InternalLinksSection pageType={seoConfig.internalLinksType || 'home'} />
            )}
        </>
    );
});

export default PageSEOUpdater;



