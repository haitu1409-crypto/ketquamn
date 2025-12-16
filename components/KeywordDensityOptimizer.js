/**
 * Keyword Density Optimizer
 * Gray Hat Technique - An toàn: Tối ưu keyword density trong content
 * 
 * Kỹ thuật:
 * - Keyword density 1-3% (tự nhiên)
 * - LSI keywords
 * - Semantic keywords
 * - Long-tail keywords
 */

export function calculateKeywordDensity(text, keyword) {
    if (!text || !keyword) return 0;
    
    const textLower = text.toLowerCase();
    const keywordLower = keyword.toLowerCase();
    const words = textLower.split(/\s+/);
    const keywordWords = keywordLower.split(/\s+/);
    
    let count = 0;
    if (keywordWords.length === 1) {
        // Single word
        count = words.filter(word => word === keywordLower).length;
    } else {
        // Phrase
        const phrase = keywordLower;
        count = (textLower.match(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    }
    
    const totalWords = words.length;
    return totalWords > 0 ? (count / totalWords) * 100 : 0;
}

export function optimizeKeywordDensity(content, targetKeywords, maxDensity = 3) {
    const densities = {};
    const suggestions = [];
    
    targetKeywords.forEach(keyword => {
        const density = calculateKeywordDensity(content, keyword);
        densities[keyword] = density;
        
        if (density < 1) {
            suggestions.push({
                keyword,
                density,
                suggestion: `Tăng mật độ từ khóa "${keyword}" lên 1-3%`,
                action: 'add'
            });
        } else if (density > maxDensity) {
            suggestions.push({
                keyword,
                density,
                suggestion: `Giảm mật độ từ khóa "${keyword}" xuống dưới ${maxDensity}%`,
                action: 'reduce'
            });
        }
    });
    
    return { densities, suggestions };
}

export function generateLSIKeywords(primaryKeyword) {
    const lsiMap = {
        'kết quả xổ số': [
            'tra cứu kết quả', 'xem kết quả', 'kết quả mới nhất',
            'kết quả hôm nay', 'kết quả xổ số nhanh nhất'
        ],
        'xsmb': [
            'kết quả xsmb', 'xsmb hôm nay', 'xsmb mới nhất',
            'kqxsmb', 'sxmb', 'xổ số miền bắc'
        ],
        'xsmn': [
            'kết quả xsmn', 'xsmn hôm nay', 'xsmn mới nhất',
            'kqxsmn', 'sxmn', 'xổ số miền nam'
        ],
        'thống kê xổ số': [
            'phân tích xổ số', 'số liệu xổ số', 'bảng thống kê',
            'thống kê chi tiết', 'thống kê 3 miền'
        ],
        'soi cầu': [
            'dự đoán xổ số', 'soi cầu miền bắc', 'soi cầu hôm nay',
            'cầu lotto', 'cầu đặc biệt'
        ]
    };
    
    const lower = primaryKeyword.toLowerCase();
    return lsiMap[lower] || [];
}

export function injectLSIKeywords(content, primaryKeyword, maxInjections = 3) {
    const lsiKeywords = generateLSIKeywords(primaryKeyword);
    let enhancedContent = content;
    let injectionCount = 0;
    
    lsiKeywords.forEach(lsi => {
        if (injectionCount >= maxInjections) return;
        
        // Chỉ inject nếu chưa có trong content
        if (!enhancedContent.toLowerCase().includes(lsi.toLowerCase())) {
            // Tìm vị trí phù hợp để inject (sau dấu chấm hoặc phẩy)
            const sentences = enhancedContent.split(/([.!?])/);
            if (sentences.length > 2) {
                const insertIndex = Math.floor(sentences.length / 2);
                sentences[insertIndex] += ` ${lsi}.`;
                enhancedContent = sentences.join('');
                injectionCount++;
            }
        }
    });
    
    return enhancedContent;
}




