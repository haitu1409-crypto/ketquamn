/**
 * Unique Content Generator
 * 
 * Tạo nội dung unique cho mỗi trang để tránh duplicate content
 * Dựa trên nghiên cứu các trang xổ số hàng đầu
 */

import { useMemo } from 'react';

/**
 * Tạo nội dung mô tả unique dựa trên ngày và region
 */
export function generateUniqueDescription(region, date, results) {
    const regionNames = {
        'bac': 'miền Bắc',
        'nam': 'miền Nam',
        'trung': 'miền Trung'
    };
    
    const regionName = regionNames[region] || '3 miền';
    const dateObj = date ? new Date(date) : new Date();
    const dateStr = dateObj.toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const dayOfWeek = dateObj.toLocaleDateString('vi-VN', { weekday: 'long' });
    const month = dateObj.toLocaleDateString('vi-VN', { month: 'long' });
    const year = dateObj.getFullYear();
    
    // Tạo unique description với context cụ thể
    return `Kết quả xổ số ${regionName} ngày ${dateStr} (${dayOfWeek}, tháng ${month} năm ${year}). 
    Tra cứu kết quả xổ số ${regionName} chính xác, cập nhật nhanh chóng. 
    Xem chi tiết các giải từ giải đặc biệt đến giải 8, thống kê đầy đủ và phân tích chi tiết.`;
}

/**
 * Tạo nội dung phân tích unique
 */
export function generateUniqueAnalysis(region, date, results) {
    const regionNames = {
        'bac': 'miền Bắc',
        'nam': 'miền Nam',
        'trung': 'miền Trung'
    };
    
    const regionName = regionNames[region] || '3 miền';
    const dateObj = date ? new Date(date) : new Date();
    const dateStr = dateObj.toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return {
        title: `Phân tích kết quả xổ số ${regionName} ngày ${dateStr}`,
        content: `Kết quả xổ số ${regionName} ngày ${dateStr} được cập nhật đầy đủ và chính xác. 
        Trang web cung cấp thông tin chi tiết về các giải thưởng, giúp người chơi tra cứu nhanh chóng và thuận tiện. 
        Dữ liệu được cập nhật liên tục để đảm bảo tính chính xác và kịp thời. 
        Người dùng có thể xem kết quả theo từng giải, từ giải đặc biệt đến giải 8, một cách rõ ràng và dễ hiểu.`
    };
}

/**
 * Tạo nội dung hướng dẫn unique
 */
export function generateUniqueGuide(region) {
    const regionNames = {
        'bac': 'miền Bắc',
        'nam': 'miền Nam',
        'trung': 'miền Trung'
    };
    
    const regionName = regionNames[region] || '3 miền';
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    return {
        title: `Hướng dẫn tra cứu kết quả xổ số ${regionName} ${currentYear}`,
        steps: [
            `Chọn miền ${regionName} từ menu điều hướng`,
            `Chọn ngày muốn tra cứu kết quả`,
            `Xem chi tiết các giải từ giải đặc biệt đến giải 8`,
            `Sử dụng tính năng tìm kiếm để tra cứu nhanh chóng`,
            `Xem thống kê để phân tích xu hướng`
        ]
    };
}

/**
 * Hook để tạo unique content
 */
export function useUniqueContent(region, date, results) {
    return useMemo(() => {
        return {
            description: generateUniqueDescription(region, date, results),
            analysis: generateUniqueAnalysis(region, date, results),
            guide: generateUniqueGuide(region)
        };
    }, [region, date, results]);
}

export default {
    generateUniqueDescription,
    generateUniqueAnalysis,
    generateUniqueGuide,
    useUniqueContent
};

