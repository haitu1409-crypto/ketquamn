/**
 * Comparison Content Component
 * 
 * Tạo nội dung so sánh với các trang web nổi tiếng
 * Giúp xuất hiện khi người dùng tìm kiếm tên các trang đó
 * 
 * Kỹ thuật an toàn:
 * - So sánh công bằng, có giá trị thực sự
 * - Không spam, không negative SEO
 * - Cung cấp thông tin hữu ích
 */

import { memo } from 'react';
import Link from 'next/link';

const COMPARISONS = {
    'ketqua04.net': {
        name: 'ketqua04.net',
        displayName: 'KETQUA.NET',
        pros: [
            'Trang web lâu đời, có uy tín',
            'Nhiều tính năng',
            'Giao diện đẹp'
        ],
        cons: [
            'Có thể có quảng cáo',
            'Tải trang chậm hơn',
            'Giao diện phức tạp'
        ],
        ourAdvantages: [
            '✅ Miễn phí 100%, không quảng cáo',
            '✅ Tải trang nhanh hơn, tối ưu performance',
            '✅ Giao diện đơn giản, dễ sử dụng',
            '✅ Cập nhật kết quả nhanh chóng',
            '✅ Responsive tốt trên mọi thiết bị',
            '✅ Thống kê chi tiết và đầy đủ'
        ],
        conclusion: `Kết Quả MN là lựa chọn tốt hơn nếu bạn muốn một trang web miễn phí, nhanh chóng, 
        và dễ sử dụng. Chúng tôi cung cấp tất cả các tính năng cần thiết mà không có quảng cáo phiền toái.`
    },
    'xosodaiphat.com': {
        name: 'xosodaiphat.com',
        displayName: 'Xổ Số Đại Phát',
        pros: [
            'Trang web phổ biến',
            'Nhiều người sử dụng',
            'Có nhiều tính năng'
        ],
        cons: [
            'Có quảng cáo nhiều',
            'Giao diện phức tạp',
            'Tải trang chậm'
        ],
        ourAdvantages: [
            '✅ Không có quảng cáo, trải nghiệm tốt hơn',
            '✅ Tải trang nhanh, tối ưu Core Web Vitals',
            '✅ Giao diện đơn giản, dễ sử dụng',
            '✅ Cập nhật kết quả nhanh chóng và chính xác',
            '✅ Mobile-friendly tốt hơn',
            '✅ Thống kê và phân tích chi tiết'
        ],
        conclusion: `Kết Quả MN cung cấp trải nghiệm tốt hơn với giao diện đơn giản, 
        không quảng cáo, và tải trang nhanh. Phù hợp cho người dùng muốn tra cứu nhanh chóng.`
    },
    'xoso.com.vn': {
        name: 'xoso.com.vn',
        displayName: 'Xổ Số .COM.VN',
        pros: [
            'Trang web lớn',
            'Nhiều tính năng',
            'Có uy tín'
        ],
        cons: [
            'Có quảng cáo',
            'Giao diện phức tạp',
            'Tải trang chậm'
        ],
        ourAdvantages: [
            '✅ Miễn phí hoàn toàn, không quảng cáo',
            '✅ Tải trang nhanh, tối ưu performance',
            '✅ Giao diện đơn giản, thân thiện',
            '✅ Cập nhật kết quả nhanh chóng',
            '✅ Responsive tốt trên mọi thiết bị',
            '✅ Dữ liệu chính xác và đầy đủ'
        ],
        conclusion: `Kết Quả MN là lựa chọn tốt hơn với giao diện đơn giản, 
        không quảng cáo, và tải trang nhanh. Phù hợp cho người dùng muốn trải nghiệm tốt.`
    }
};

export const ComparisonContent = memo(function ComparisonContent({
    targetBrand = 'ketqua04.net',
    showFullComparison = false, // ✅ Mặc định ẩn, chỉ hiển thị khi cần
    compact = true, // ✅ Compact mode
    className = ''
}) {
    const comparison = COMPARISONS[targetBrand];

    if (!comparison) return null;

    // ✅ Compact mode - chỉ hiển thị ngắn gọn ở footer
    if (compact && !showFullComparison) {
        return (
            <div
                className={className}
                style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: '13px',
                    textAlign: 'center',
                    color: '#6b7280'
                }}
            >
                <p style={{ margin: 0 }}>
                    <strong>Kết Quả MN</strong> - Thay thế {comparison.displayName}, tốt hơn {comparison.displayName}.
                    Miễn phí 100%, nhanh chóng, không quảng cáo.
                </p>
            </div>
        );
    }

    return (
        <section
            className={className}
            itemScope
            itemType="https://schema.org/Article"
            style={{
                marginTop: '40px',
                padding: '40px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <header style={{ marginBottom: '30px' }}>
                <h2
                    style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        color: '#111827',
                        lineHeight: '1.3'
                    }}
                    itemProp="headline"
                >
                    So sánh Kết Quả MN vs {comparison.displayName}
                </h2>
                <p
                    style={{
                        fontSize: '18px',
                        lineHeight: '1.8',
                        color: '#374151',
                        marginBottom: '0'
                    }}
                    itemProp="description"
                >
                    So sánh chi tiết giữa Kết Quả MN và {comparison.displayName} để giúp bạn chọn lựa trang web phù hợp nhất.
                </p>
            </header>

            <div itemProp="articleBody">
                {/* Comparison Table */}
                {showFullComparison && (
                    <div style={{ marginBottom: '30px' }}>
                        <h3
                            style={{
                                fontSize: '22px',
                                fontWeight: '600',
                                marginBottom: '20px',
                                color: '#111827'
                            }}
                        >
                            Bảng so sánh
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            {/* Competitor */}
                            <div style={{
                                padding: '24px',
                                background: '#f9fafb',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <h4 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    color: '#111827'
                                }}>
                                    {comparison.displayName}
                                </h4>

                                <div style={{ marginBottom: '16px' }}>
                                    <strong style={{ color: '#059669' }}>Ưu điểm:</strong>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '8px 0 0 0'
                                    }}>
                                        {comparison.pros.map((pro, index) => (
                                            <li key={index} style={{
                                                fontSize: '14px',
                                                lineHeight: '1.6',
                                                color: '#374151',
                                                marginBottom: '8px',
                                                paddingLeft: '20px',
                                                position: 'relative'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    color: '#059669'
                                                }}>✓</span>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <strong style={{ color: '#dc2626' }}>Nhược điểm:</strong>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '8px 0 0 0'
                                    }}>
                                        {comparison.cons.map((con, index) => (
                                            <li key={index} style={{
                                                fontSize: '14px',
                                                lineHeight: '1.6',
                                                color: '#374151',
                                                marginBottom: '8px',
                                                paddingLeft: '20px',
                                                position: 'relative'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    color: '#dc2626'
                                                }}>✗</span>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Our Site */}
                            <div style={{
                                padding: '24px',
                                background: '#fef3c7',
                                borderRadius: '8px',
                                border: '2px solid #FF6B35'
                            }}>
                                <h4 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    color: '#111827'
                                }}>
                                    Kết Quả MN
                                </h4>

                                <div>
                                    <strong style={{ color: '#FF6B35' }}>Ưu điểm vượt trội:</strong>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '8px 0 0 0'
                                    }}>
                                        {comparison.ourAdvantages.map((advantage, index) => (
                                            <li key={index} style={{
                                                fontSize: '14px',
                                                lineHeight: '1.6',
                                                color: '#374151',
                                                marginBottom: '8px',
                                                paddingLeft: '20px',
                                                position: 'relative'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    color: '#FF6B35',
                                                    fontWeight: 'bold'
                                                }}>✓</span>
                                                {advantage}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conclusion */}
                <div style={{
                    padding: '24px',
                    background: '#f0f9ff',
                    borderRadius: '8px',
                    borderLeft: '4px solid #FF6B35'
                }}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#111827'
                    }}>
                        Kết luận
                    </h3>
                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        color: '#374151',
                        margin: 0
                    }}>
                        {comparison.conclusion}
                    </p>
                </div>

                {/* CTA */}
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center'
                }}>
                    <Link
                        href="/"
                        style={{
                            display: 'inline-block',
                            padding: '14px 28px',
                            background: '#FF6B35',
                            color: '#ffffff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#FF8C42';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = '#FF6B35';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Dùng thử Kết Quả MN ngay
                    </Link>
                </div>
            </div>

            <meta itemProp="datePublished" content={new Date().toISOString()} />
            <meta itemProp="dateModified" content={new Date().toISOString()} />
            <meta itemProp="author" content="Kết Quả MN | KETQUAMN.COM" />
        </section>
    );
});

export default ComparisonContent;

