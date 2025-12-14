/**
 * Content SEO Optimizer
 * Gray Hat Technique - An toàn: Tối ưu nội dung cho SEO
 * 
 * Kỹ thuật:
 * - Heading optimization
 * - Keyword placement
 * - Content length optimization
 * - Readability score
 */

export function optimizeHeadings(content, primaryKeyword) {
    // Đảm bảo H1 chứa primary keyword
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/i;
    const h1Match = content.match(h1Regex);
    
    if (h1Match && !h1Match[1].toLowerCase().includes(primaryKeyword.toLowerCase())) {
        return {
            suggestion: `H1 nên chứa từ khóa chính: "${primaryKeyword}"`,
            action: 'update-h1'
        };
    }
    
    return null;
}

export function optimizeContentLength(content, minWords = 300, optimalWords = 800) {
    const words = content.split(/\s+/).length;
    
    if (words < minWords) {
        return {
            suggestion: `Nội dung quá ngắn (${words} từ). Nên có ít nhất ${minWords} từ.`,
            action: 'expand-content',
            current: words,
            target: minWords
        };
    }
    
    if (words < optimalWords) {
        return {
            suggestion: `Nội dung nên dài hơn (${words} từ). Tối ưu: ${optimalWords} từ.`,
            action: 'expand-content',
            current: words,
            target: optimalWords
        };
    }
    
    return null;
}

export function checkKeywordInFirstParagraph(content, keyword) {
    const firstParagraph = content.split('\n\n')[0] || content.split('</p>')[0] || content.substring(0, 200);
    
    if (!firstParagraph.toLowerCase().includes(keyword.toLowerCase())) {
        return {
            suggestion: `Nên đặt từ khóa "${keyword}" trong đoạn đầu tiên`,
            action: 'add-keyword-first-paragraph'
        };
    }
    
    return null;
}

export function optimizeImages(content) {
    const imgRegex = /<img[^>]*>/gi;
    const images = content.match(imgRegex) || [];
    const suggestions = [];
    
    images.forEach((img, index) => {
        if (!img.includes('alt=')) {
            suggestions.push({
                suggestion: `Ảnh ${index + 1} thiếu alt text`,
                action: 'add-alt-text',
                index
            });
        }
    });
    
    return suggestions;
}

export function generateSEOContentSuggestions(content, primaryKeyword, secondaryKeywords = []) {
    const suggestions = [];
    
    // Check H1
    const h1Suggestion = optimizeHeadings(content, primaryKeyword);
    if (h1Suggestion) suggestions.push(h1Suggestion);
    
    // Check content length
    const lengthSuggestion = optimizeContentLength(content);
    if (lengthSuggestion) suggestions.push(lengthSuggestion);
    
    // Check first paragraph
    const firstParaSuggestion = checkKeywordInFirstParagraph(content, primaryKeyword);
    if (firstParaSuggestion) suggestions.push(firstParaSuggestion);
    
    // Check images
    const imageSuggestions = optimizeImages(content);
    suggestions.push(...imageSuggestions);
    
    return suggestions;
}

