/**
 * Editorial Content Component
 * 
 * Tạo nội dung biên tập phong phú cho các trang xổ số
 * Tránh thin content và duplicate content
 * 
 * Kỹ thuật:
 * - Unique content cho mỗi trang
 * - Contextual information
 * - Educational content
 * - Analysis và insights
 */

import { memo, useMemo } from 'react';

const EDITORIAL_CONTENT = {
    'ket-qua-xo-so-mien-bac': {
        title: 'Kết quả xổ số miền Bắc - Thông tin chi tiết và đầy đủ',
        introduction: `Kết quả xổ số miền Bắc (XSMB) là một trong những loại hình xổ số phổ biến nhất tại Việt Nam. 
        Trang web cung cấp thông tin đầy đủ và chính xác về kết quả xổ số miền Bắc, giúp người chơi tra cứu nhanh chóng và thuận tiện.`,
        body: [
            `Xổ số miền Bắc được tổ chức hàng ngày, với nhiều giải thưởng từ giải đặc biệt đến giải 8. 
            Mỗi giải có các số trúng thưởng khác nhau, và người chơi có thể tra cứu kết quả ngay sau khi có kết quả chính thức.`,
            `Việc tra cứu kết quả xổ số miền Bắc trở nên dễ dàng hơn với công nghệ hiện đại. 
            Trang web cung cấp giao diện thân thiện, dễ sử dụng, giúp người dùng nhanh chóng tìm thấy thông tin cần thiết.`,
            `Kết quả được cập nhật liên tục và đảm bảo tính chính xác. Người dùng có thể xem kết quả theo ngày, 
            theo tuần hoặc tra cứu lịch sử kết quả trong nhiều tháng trước đó.`
        ],
        tips: [
            'Tra cứu kết quả ngay sau khi có kết quả chính thức để đảm bảo tính chính xác',
            'Sử dụng tính năng tìm kiếm để nhanh chóng tìm kết quả theo ngày cụ thể',
            'Xem thống kê để phân tích xu hướng và tần suất xuất hiện của các số'
        ]
    },
    'ket-qua-xo-so-mien-nam': {
        title: 'Kết quả xổ số miền Nam - Cập nhật nhanh và chính xác',
        introduction: `Kết quả xổ số miền Nam (XSMN) là một phần quan trọng trong hệ thống xổ số Việt Nam. 
        Trang web cung cấp thông tin đầy đủ về kết quả xổ số miền Nam, giúp người chơi dễ dàng tra cứu và đối chiếu.`,
        body: [
            `Xổ số miền Nam được tổ chức hàng ngày với nhiều giải thưởng hấp dẫn. 
            Người chơi có thể tra cứu kết quả ngay sau khi có kết quả chính thức từ các công ty xổ số.`,
            `Trang web được thiết kế để cung cấp thông tin một cách rõ ràng và dễ hiểu. 
            Người dùng có thể xem kết quả theo từng giải, từ giải đặc biệt đến giải 8, một cách thuận tiện.`,
            `Dữ liệu được cập nhật liên tục và đảm bảo tính chính xác. 
            Người dùng có thể yên tâm sử dụng thông tin trên trang web để tra cứu và đối chiếu kết quả.`
        ],
        tips: [
            'Kiểm tra kết quả thường xuyên để không bỏ lỡ thông tin quan trọng',
            'Sử dụng các công cụ thống kê để phân tích xu hướng',
            'Lưu ý thời gian cập nhật kết quả để tra cứu đúng lúc'
        ]
    },
    'home': {
        title: 'Kết Quả Xổ Số - Tra cứu nhanh chóng và chính xác',
        introduction: `Kết Quả MN là trang web chuyên cung cấp thông tin về kết quả xổ số 3 miền (Bắc, Nam, Trung) một cách nhanh chóng và chính xác. 
        Trang web được thiết kế để phục vụ nhu cầu tra cứu kết quả xổ số của người dùng một cách thuận tiện nhất.`,
        body: [
            `Xổ số là một hình thức giải trí phổ biến tại Việt Nam, với hàng triệu người tham gia mỗi ngày. 
            Việc tra cứu kết quả xổ số một cách nhanh chóng và chính xác là nhu cầu thiết yếu của người chơi.`,
            `Trang web cung cấp đầy đủ thông tin về kết quả xổ số 3 miền, bao gồm kết quả theo ngày, 
            thống kê, và các công cụ hỗ trợ khác để người dùng có thể tra cứu và phân tích kết quả một cách hiệu quả.`,
            `Với giao diện thân thiện và dễ sử dụng, trang web giúp người dùng nhanh chóng tìm thấy thông tin cần thiết. 
            Dữ liệu được cập nhật liên tục và đảm bảo tính chính xác, giúp người dùng yên tâm sử dụng.`
        ],
        tips: [
            'Chọn miền và ngày để tra cứu kết quả nhanh chóng',
            'Sử dụng các công cụ thống kê để phân tích xu hướng',
            'Theo dõi trang web thường xuyên để cập nhật kết quả mới nhất'
        ]
    }
};

export const EditorialContent = memo(function EditorialContent({
    pageType = 'home',
    className = ''
}) {
    const content = useMemo(() => EDITORIAL_CONTENT[pageType] || EDITORIAL_CONTENT['home'], [pageType]);
    
    return (
        <article 
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
                    {content.title}
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
                    {content.introduction}
                </p>
            </header>
            
            <div itemProp="articleBody">
                {content.body.map((paragraph, index) => (
                    <p 
                        key={index}
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#4b5563',
                            marginBottom: '20px'
                        }}
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
            
            {content.tips && content.tips.length > 0 && (
                <section 
                    style={{
                        marginTop: '30px',
                        padding: '24px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        borderLeft: '4px solid #FF6B35'
                    }}
                >
                    <h3 
                        style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '16px',
                            color: '#111827'
                        }}
                    >
                        💡 Mẹo hữu ích
                    </h3>
                    <ul 
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}
                    >
                        {content.tips.map((tip, index) => (
                            <li 
                                key={index}
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    color: '#374151',
                                    marginBottom: '12px',
                                    paddingLeft: '24px',
                                    position: 'relative'
                                }}
                            >
                                <span 
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        color: '#FF6B35',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✓
                                </span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            
            <meta itemProp="datePublished" content={new Date().toISOString()} />
            <meta itemProp="dateModified" content={new Date().toISOString()} />
            <meta itemProp="author" content="Kết Quả MN | KETQUAMN.COM" />
            <meta itemProp="publisher" content="Kết Quả MN | KETQUAMN.COM" />
        </article>
    );
});

export default EditorialContent;

