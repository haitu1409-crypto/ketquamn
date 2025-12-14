/**
 * Internal Linking SEO Component
 * Gray Hat Technique - An toàn: Tối ưu internal linking để tăng PageRank
 * 
 * Kỹ thuật:
 * - Contextual internal links
 * - Topic clusters
 * - Hub and spoke model
 * - Related content linking
 */

import Link from 'next/link';

const INTERNAL_LINKS = {
    // Hub pages (trang chính) - Tăng cường internal linking
    home: {
        links: [
            { url: '/ket-qua-xo-so-mien-bac', anchor: 'Kết quả xổ số miền Bắc', keywords: ['xsmb', 'kqxsmb', 'kết quả xổ số miền bắc'] },
            { url: '/ket-qua-xo-so-mien-nam', anchor: 'Kết quả xổ số miền Nam', keywords: ['xsmn', 'kqxsmn', 'kết quả xổ số miền nam'] },
            { url: '/thong-ke', anchor: 'Thống kê xổ số', keywords: ['thống kê', 'phân tích xổ số'] },
            { url: '/soi-cau-mien-bac-ai', anchor: 'Soi cầu miền Bắc', keywords: ['soi cầu', 'dự đoán xsmb'] },
            { url: '/dan-9x0x', anchor: 'Dàn đề 9x-0x', keywords: ['dàn đề', 'tạo dàn'] },
            { url: '/dan-2d', anchor: 'Dàn đề 2D', keywords: ['dàn 2d', 'dàn đề 2 số'] },
            { url: '/dan-dac-biet', anchor: 'Dàn đề đặc biệt', keywords: ['dàn đặc biệt', 'lọc dàn'] },
            { url: '/thongke/lo-gan', anchor: 'Thống kê lô gan', keywords: ['lô gan', 'số gan'] },
        ]
    },
    // Kết quả xổ số pages - Tăng cường internal linking
    'ket-qua-xo-so-mien-bac': {
        links: [
            { url: '/ket-qua-xo-so-mien-nam', anchor: 'Kết quả XSMN', keywords: ['xsmn', 'kết quả miền nam'] },
            { url: '/thongke/lo-gan', anchor: 'Thống kê lô gan', keywords: ['lô gan', 'số gan'] },
            { url: '/thongke/giai-dac-biet', anchor: 'Thống kê giải đặc biệt', keywords: ['giải đặc biệt', 'thống kê gdb'] },
            { url: '/soi-cau-mien-bac-ai', anchor: 'Soi cầu XSMB', keywords: ['soi cầu', 'dự đoán'] },
            { url: '/thongke/dau-duoi', anchor: 'Thống kê đầu đuôi', keywords: ['đầu đuôi', 'thống kê'] },
            { url: '/thongke/tan-suat-loto', anchor: 'Tần suất lô tô', keywords: ['tần suất', 'lô tô'] },
            { url: '/kqxs-10-ngay', anchor: 'Kết quả 10 ngày', keywords: ['kết quả 10 ngày', 'lịch sử'] },
        ]
    },
    'ket-qua-xo-so-mien-nam': {
        links: [
            { url: '/ket-qua-xo-so-mien-bac', anchor: 'Kết quả XSMB', keywords: ['xsmb', 'kết quả miền bắc'] },
            { url: '/thong-ke', anchor: 'Thống kê xổ số', keywords: ['thống kê', 'phân tích'] },
            { url: '/thongke/lo-gan', anchor: 'Thống kê lô gan', keywords: ['lô gan'] },
            { url: '/thongke/giai-dac-biet', anchor: 'Thống kê giải đặc biệt', keywords: ['giải đặc biệt'] },
            { url: '/kqxs-10-ngay', anchor: 'Kết quả 10 ngày', keywords: ['kết quả 10 ngày'] },
        ]
    },
    // Thống kê pages - Tăng cường internal linking
    'thong-ke': {
        links: [
            { url: '/thongke/lo-gan', anchor: 'Lô gan XSMB', keywords: ['lô gan'] },
            { url: '/thongke/giai-dac-biet', anchor: 'Giải đặc biệt', keywords: ['giải đặc biệt'] },
            { url: '/thongke/dau-duoi', anchor: 'Đầu đuôi', keywords: ['đầu đuôi'] },
            { url: '/thongke/tan-suat-loto', anchor: 'Tần suất lô tô', keywords: ['tần suất'] },
            { url: '/thongke/tan-suat-locap', anchor: 'Tần suất lô cặp', keywords: ['lô cặp', 'tần suất'] },
            { url: '/ket-qua-xo-so-mien-bac', anchor: 'Kết quả XSMB', keywords: ['xsmb'] },
            { url: '/ket-qua-xo-so-mien-nam', anchor: 'Kết quả XSMN', keywords: ['xsmn'] },
        ]
    },
    // Soi cầu pages
    'soi-cau-mien-bac-ai': {
        links: [
            { url: '/soi-cau-dac-biet-mien-bac', anchor: 'Soi cầu đặc biệt', keywords: ['soi cầu đặc biệt'] },
            { url: '/soi-cau-loto-mien-bac', anchor: 'Soi cầu lô tô', keywords: ['soi cầu lô tô'] },
            { url: '/ket-qua-xo-so-mien-bac', anchor: 'Kết quả XSMB', keywords: ['xsmb'] },
            { url: '/thongke/lo-gan', anchor: 'Thống kê lô gan', keywords: ['lô gan'] },
        ]
    },
};

export function getInternalLinks(pageType) {
    return INTERNAL_LINKS[pageType]?.links || INTERNAL_LINKS.home.links;
}

export function InternalLinksSection({ pageType, className = '' }) {
    const links = getInternalLinks(pageType);
    
    if (!links || links.length === 0) return null;

    return (
        <nav className={className} aria-label="Internal links">
            <div style={{ 
                padding: '20px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                marginTop: '20px'
            }}>
                <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    marginBottom: '12px',
                    color: '#FF6B35'
                }}>
                    🔗 Xem thêm:
                </h3>
                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    {links.map((link, index) => (
                        <li key={index} style={{ display: 'inline-block' }}>
                            <Link 
                                href={link.url}
                                style={{
                                    display: 'inline-block',
                                    padding: '6px 12px',
                                    background: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    color: '#FF6B35',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#FF6B35';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#fff';
                                    e.target.style.color = '#FF6B35';
                                }}
                            >
                                {link.anchor}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default InternalLinksSection;

