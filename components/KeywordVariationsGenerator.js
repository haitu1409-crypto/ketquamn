/**
 * Keyword Variations Generator
 * Tạo tất cả variations của keywords để user gõ kiểu gì cũng ra
 * 
 * Variations:
 * 1. Có dấu / không dấu
 * 2. Viết hoa / viết thường
 * 3. Có khoảng trắng / không có
 * 4. Gạch ngang / gạch dưới
 * 5. Viết tắt
 * 6. Sai chính tả phổ biến
 * 7. Từ đồng nghĩa
 * 8. Từ liên quan ngữ nghĩa
 */

/**
 * Remove Vietnamese diacritics
 */
function removeDiacritics(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Generate all keyword variations
 */
export function generateAllKeywordVariations(keyword) {
    if (!keyword) return [];
    
    const variations = new Set();
    const lower = keyword.toLowerCase().trim();
    const upper = keyword.toUpperCase().trim();
    const noDiacritics = removeDiacritics(lower);
    const noDiacriticsUpper = removeDiacritics(upper);
    
    // 1. Original variations
    variations.add(keyword.trim());
    variations.add(lower);
    variations.add(upper);
    variations.add(keyword.trim().charAt(0).toUpperCase() + keyword.trim().slice(1).toLowerCase());
    
    // 2. No diacritics
    variations.add(noDiacritics);
    variations.add(noDiacriticsUpper);
    variations.add(noDiacritics.charAt(0).toUpperCase() + noDiacritics.slice(1));
    
    // 3. No spaces
    variations.add(lower.replace(/\s+/g, ''));
    variations.add(noDiacritics.replace(/\s+/g, ''));
    variations.add(upper.replace(/\s+/g, ''));
    
    // 4. Hyphenated
    variations.add(lower.replace(/\s+/g, '-'));
    variations.add(noDiacritics.replace(/\s+/g, '-'));
    variations.add(upper.replace(/\s+/g, '-'));
    
    // 5. Underscored
    variations.add(lower.replace(/\s+/g, '_'));
    variations.add(noDiacritics.replace(/\s+/g, '_'));
    variations.add(upper.replace(/\s+/g, '_'));
    
    // 6. Mixed spaces and hyphens
    variations.add(lower.replace(/\s+/g, '-'));
    variations.add(lower.replace(/\s+/g, '_'));
    
    // 7. Common abbreviations
    const abbreviations = {
        'ket qua': ['ketqua', 'kq', 'ket-qua', 'ket_qua'],
        'xo so': ['xoso', 'xs', 'xo-so', 'xo_so'],
        'mien bac': ['mienbac', 'mb', 'mien-bac', 'mien_bac'],
        'mien nam': ['miennam', 'mn', 'mien-nam', 'mien_nam'],
        'mien trung': ['mientrung', 'mt', 'mien-trung', 'mien_trung'],
        'soi cau': ['soicau', 'sc', 'soi-cau', 'soi_cau'],
        'thong ke': ['thongke', 'tk', 'thong-ke', 'thong_ke'],
        'dan de': ['dande', 'dd', 'dan-de', 'dan_de']
    };
    
    Object.entries(abbreviations).forEach(([full, abbrs]) => {
        if (lower.includes(full)) {
            abbrs.forEach(abbr => {
                variations.add(lower.replace(full, abbr));
                variations.add(noDiacritics.replace(full, abbr));
            });
        }
    });
    
    // 8. Common misspellings
    const misspellings = {
        'ket qua': ['ket quả', 'kết qua', 'ket quá', 'kết quả'],
        'xo so': ['xổ số', 'xo số', 'xổ so', 'xo so'],
        'mien bac': ['miền bắc', 'mien bắc', 'miền bac', 'mien bac'],
        'mien nam': ['miền nam', 'mien nam', 'miền nam', 'mien nam'],
        'soi cau': ['soi cầu', 'soi cau', 'soi cầu', 'soi cau'],
        'thong ke': ['thống kê', 'thong kê', 'thống ke', 'thong ke']
    };
    
    Object.entries(misspellings).forEach(([correct, misspelled]) => {
        if (lower.includes(correct)) {
            misspelled.forEach(miss => {
                variations.add(lower.replace(correct, miss));
            });
        }
    });
    
    // 9. Add numbers (for dates, etc.)
    if (lower.includes('hom nay') || lower.includes('hôm nay')) {
        variations.add(lower.replace(/hom nay|hôm nay/g, 'hom nay'));
        variations.add(lower.replace(/hom nay|hôm nay/g, 'hôm nay'));
        variations.add(lower.replace(/hom nay|hôm nay/g, 'ngay hom nay'));
        variations.add(lower.replace(/hom nay|hôm nay/g, 'ngày hôm nay'));
    }
    
    // 10. Add time variations
    if (lower.includes('hom nay') || lower.includes('hôm nay')) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        
        variations.add(lower.replace(/hom nay|hôm nay/g, `${day}/${month}/${year}`));
        variations.add(lower.replace(/hom nay|hôm nay/g, `${day}-${month}-${year}`));
    }
    
    return Array.from(variations).filter(Boolean);
}

/**
 * Generate synonyms and related terms
 */
export function generateSynonyms(keyword) {
    if (!keyword) return [];
    
    const synonyms = new Set();
    const lower = keyword.toLowerCase();
    
    // Synonyms mapping
    const synonymMap = {
        'ket qua': ['kết quả', 'kq', 'ketqua', 'kết quả xổ số', 'kqxs'],
        'xo so': ['xổ số', 'xoso', 'xs', 'xổ số', 'lottery'],
        'mien bac': ['miền bắc', 'mb', 'mienbac', 'bắc', 'bac'],
        'mien nam': ['miền nam', 'mn', 'miennam', 'nam'],
        'mien trung': ['miền trung', 'mt', 'mientrung', 'trung'],
        'soi cau': ['soi cầu', 'soicau', 'sc', 'dự đoán', 'du doan', 'dudoan'],
        'thong ke': ['thống kê', 'thongke', 'tk', 'phân tích', 'phan tich'],
        'dan de': ['dàn đề', 'dande', 'dd', 'dàn số', 'dan so', 'danso'],
        'hom nay': ['hôm nay', 'homnay', 'hn', 'ngày hôm nay', 'ngay hom nay', 'hôm nay', 'hom nay']
    };
    
    Object.entries(synonymMap).forEach(([key, values]) => {
        if (lower.includes(key)) {
            values.forEach(syn => {
                synonyms.add(syn);
                synonyms.add(syn.toUpperCase());
                synonyms.add(removeDiacritics(syn));
            });
        }
    });
    
    return Array.from(synonyms);
}

/**
 * Generate LSI (Latent Semantic Indexing) keywords
 */
export function generateLSIKeywords(keyword) {
    if (!keyword) return [];
    
    const lsi = new Set();
    const lower = keyword.toLowerCase();
    
    // LSI mapping
    const lsiMap = {
        'ket qua': ['tra cứu', 'xem', 'kiểm tra', 'tìm kiếm', 'xem kết quả', 'tra cuu', 'xem ket qua'],
        'xo so': ['lottery', 'vé số', 'số xổ', 'quay số', 've so', 'so xo', 'quay so'],
        'mien bac': ['hà nội', 'thủ đô', 'bắc bộ', 'ha noi', 'thu do', 'bac bo'],
        'mien nam': ['sài gòn', 'tp hcm', 'nam bộ', 'sai gon', 'tp hcm', 'nam bo'],
        'soi cau': ['phân tích', 'dự đoán', 'chốt số', 'phan tich', 'du doan', 'chot so'],
        'thong ke': ['số liệu', 'bảng thống kê', 'phân tích', 'so lieu', 'bang thong ke', 'phan tich']
    };
    
    Object.entries(lsiMap).forEach(([key, values]) => {
        if (lower.includes(key)) {
            values.forEach(term => {
                lsi.add(term);
                lsi.add(term.toUpperCase());
                lsi.add(removeDiacritics(term));
            });
        }
    });
    
    return Array.from(lsi);
}

/**
 * Generate all variations for multiple keywords
 */
export function generateAllVariationsForKeywords(keywords) {
    if (!keywords || !Array.isArray(keywords)) return [];
    
    const allVariations = new Set();
    
    keywords.forEach(keyword => {
        if (!keyword) return;
        
        // Generate all variations
        const variations = generateAllKeywordVariations(keyword);
        variations.forEach(v => allVariations.add(v));
        
        // Generate synonyms
        const synonyms = generateSynonyms(keyword);
        synonyms.forEach(s => allVariations.add(s));
        
        // Generate LSI keywords
        const lsi = generateLSIKeywords(keyword);
        lsi.forEach(l => allVariations.add(l));
    });
    
    return Array.from(allVariations);
}

// Export all functions
export {
    removeDiacritics,
    generateAllKeywordVariations,
    generateSynonyms,
    generateLSIKeywords,
    generateAllVariationsForKeywords
};

