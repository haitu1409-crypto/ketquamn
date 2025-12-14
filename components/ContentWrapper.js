/**
 * Content Wrapper Component
 * 
 * Wrapper để thêm context và giá trị cho nội dung xổ số
 * Tránh bị Google không lập chỉ mục do thin content hoặc duplicate content
 * 
 * Kỹ thuật từ các trang xổ số hàng đầu:
 * - Thêm editorial content (giải thích, phân tích)
 * - Thêm context và giá trị thực sự
 * - Unique content cho mỗi trang
 * - Structured content với headings và paragraphs
 */

import { memo } from 'react';

/**
 * Tạo nội dung mô tả phong phú cho trang kết quả
 */
export function generateRichDescription(region, date, results) {
    const regionNames = {
        'bac': 'miền Bắc',
        'nam': 'miền Nam',
        'trung': 'miền Trung'
    };
    
    const regionName = regionNames[region] || '3 miền';
    const dateStr = date ? new Date(date).toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }) : 'hôm nay';
    
    return `Kết quả xổ số ${regionName} ngày ${dateStr}. Xem chi tiết các giải từ giải đặc biệt đến giải 8, tra cứu nhanh chóng và chính xác. Cập nhật liên tục, thống kê đầy đủ.`;
}

/**
 * Tạo nội dung phân tích cho trang kết quả
 */
export function generateAnalysisContent(region, date, results) {
    const regionNames = {
        'bac': 'miền Bắc',
        'nam': 'miền Nam',
        'trung': 'miền Trung'
    };
    
    const regionName = regionNames[region] || '3 miền';
    
    return {
        title: `Phân tích kết quả xổ số ${regionName}`,
        content: `Kết quả xổ số ${regionName} được cập nhật đầy đủ và chính xác. Trang web cung cấp thông tin chi tiết về các giải thưởng, giúp người chơi tra cứu nhanh chóng và thuận tiện. Dữ liệu được cập nhật liên tục để đảm bảo tính chính xác và kịp thời.`
    };
}

/**
 * Content Wrapper Component
 * Thêm context và giá trị cho nội dung để tránh thin content
 */
export const ContentWrapper = memo(function ContentWrapper({
    children,
    region = null,
    date = null,
    title = null,
    showAnalysis = true,
    className = ''
}) {
    const analysisContent = region ? generateAnalysisContent(region, date, null) : null;
    
    return (
        <div className={className}>
            {/* Main Content */}
            {children}
            
            {/* ✅ Editorial Content - Thêm giá trị thực sự */}
            {showAnalysis && analysisContent && (
                <section 
                    style={{
                        marginTop: '40px',
                        padding: '30px',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                    }}
                    itemScope
                    itemType="https://schema.org/Article"
                >
                    <h2 
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginBottom: '16px',
                            color: '#111827'
                        }}
                        itemProp="headline"
                    >
                        {analysisContent.title}
                    </h2>
                    <div 
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#374151'
                        }}
                        itemProp="articleBody"
                    >
                        <p style={{ marginBottom: '16px' }}>
                            {analysisContent.content}
                        </p>
                        <p style={{ marginBottom: '16px' }}>
                            Việc tra cứu kết quả xổ số một cách nhanh chóng và chính xác là nhu cầu thiết yếu của người chơi. 
                            Trang web cung cấp đầy đủ thông tin về các giải thưởng, giúp người dùng dễ dàng kiểm tra và đối chiếu kết quả.
                        </p>
                        <p>
                            Dữ liệu được cập nhật từ các nguồn chính thức, đảm bảo tính chính xác và độ tin cậy. 
                            Người dùng có thể tra cứu kết quả theo ngày, theo tuần hoặc theo tháng một cách thuận tiện.
                        </p>
                    </div>
                    <meta itemProp="datePublished" content={new Date().toISOString()} />
                    <meta itemProp="dateModified" content={new Date().toISOString()} />
                </section>
            )}
            
            {/* ✅ FAQ Section - Thêm giá trị và context */}
            <section 
                style={{
                    marginTop: '30px',
                    padding: '30px',
                    background: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                }}
                itemScope
                itemType="https://schema.org/FAQPage"
            >
                <h2 
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: '#111827'
                    }}
                >
                    Câu hỏi thường gặp
                </h2>
                <div itemScope itemType="https://schema.org/Question">
                    <h3 
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            color: '#374151'
                        }}
                        itemProp="name"
                    >
                        Kết quả xổ số được cập nhật khi nào?
                    </h3>
                    <div 
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#6b7280',
                            marginBottom: '24px'
                        }}
                        itemScope
                        itemType="https://schema.org/Answer"
                    >
                        <p itemProp="text">
                            Kết quả xổ số được cập nhật ngay sau khi có kết quả chính thức từ các công ty xổ số. 
                            Thời gian cập nhật thường là vào buổi chiều các ngày trong tuần và buổi tối các ngày cuối tuần.
                        </p>
                    </div>
                </div>
                
                <div itemScope itemType="https://schema.org/Question">
                    <h3 
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            color: '#374151'
                        }}
                        itemProp="name"
                    >
                        Làm thế nào để tra cứu kết quả xổ số?
                    </h3>
                    <div 
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#6b7280',
                            marginBottom: '24px'
                        }}
                        itemScope
                        itemType="https://schema.org/Answer"
                    >
                        <p itemProp="text">
                            Bạn có thể tra cứu kết quả xổ số bằng cách chọn miền (Bắc, Nam, Trung) và chọn ngày muốn xem. 
                            Trang web sẽ hiển thị đầy đủ các giải từ giải đặc biệt đến giải 8 một cách rõ ràng và dễ hiểu.
                        </p>
                    </div>
                </div>
                
                <div itemScope itemType="https://schema.org/Question">
                    <h3 
                        style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            color: '#374151'
                        }}
                        itemProp="name"
                    >
                        Kết quả xổ số có chính xác không?
                    </h3>
                    <div 
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#6b7280'
                        }}
                        itemScope
                        itemType="https://schema.org/Answer"
                    >
                        <p itemProp="text">
                            Tất cả kết quả xổ số trên trang web đều được lấy từ các nguồn chính thức và được cập nhật ngay sau khi có kết quả. 
                            Chúng tôi cam kết cung cấp thông tin chính xác và đáng tin cậy cho người dùng.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
});

export default ContentWrapper;


