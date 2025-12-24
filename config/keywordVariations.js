/**
 * Keyword Variations Manager
 * Quản lý tất cả biến thể từ khóa cho SEO
 * Bao gồm: có dấu, không dấu, sai chính tả, spacing variations
 * 
 * Mục tiêu: Tối ưu tìm kiếm trên Google, Bing, Cốc Cốc với mọi cách gõ của người dùng
 */

/**
 * Hàm tạo tất cả biến thể của một keyword
 * @param {string} base - Từ khóa gốc
 * @returns {Array} - Mảng tất cả biến thể
 */
function generateAllVariations(base) {
    const variations = new Set([base]);

    // Thêm version không dấu
    const noDiacritics = removeDiacritics(base);
    if (noDiacritics !== base) {
        variations.add(noDiacritics);
    }

    // Thêm version không space
    variations.add(base.replace(/\s+/g, ''));
    variations.add(noDiacritics.replace(/\s+/g, ''));

    // Thêm version hyphen thay vì space
    variations.add(base.replace(/\s+/g, '-'));
    variations.add(noDiacritics.replace(/\s+/g, '-'));

    // Thêm version underscore thay vì space
    variations.add(base.replace(/\s+/g, '_'));
    variations.add(noDiacritics.replace(/\s+/g, '_'));

    return Array.from(variations);
}

/**
 * Loại bỏ dấu tiếng Việt
 */
function removeDiacritics(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

/**
 * BRAND KEYWORDS - Từ khóa thương hiệu (SEO 2025: Chất lượng > Số lượng)
 * Tất cả biến thể của "kết quả MN" - Tối ưu theo Google SEO Best Practices 2025
 * Tập trung vào keywords tự nhiên, có ý nghĩa, không spam
 */
const BRAND_KEYWORDS = {
    // ✅ PRIMARY BRAND - Tên thương hiệu chính
    primary: [
        'Kết Quả MN', 'ket qua MN', 'KETQUAMN.COM', 'ketquamn.com',
        'Ket Qua MN', 'KetQuaMN', 'ketquamn', 'KETQUAMN',
        'ket qua mn', 'ket-qua-mn', 'ket_qua_mn',
    ],
    // ✅ BRAND + FEATURE COMBINATIONS - Tự nhiên, có ý nghĩa
    brandFeature: [
        'ketqua xsmn', 'ket qua xsmn', 'ketqua XSMN', 'ket qua XSMN',
        'ketqua xsmb', 'ket qua xsmb', 'ketqua XSMB', 'ket qua XSMB',
        'ketqua xsmt', 'ket qua xsmt', 'ketqua XSMT', 'ket qua XSMT',
        'ketquamn xsmn', 'ketquamn xsmb', 'ketquamn xsmt',
        'ketquamn.com xsmn', 'ketquamn.com xsmb', 'ketquamn.com xsmt',
        'ket qua mn xsmn', 'ket qua mn xsmb', 'ket qua mn xsmt',
        'kết quả mn xsmn', 'kết quả mn xsmb', 'kết quả mn xsmt',
    ],
    // ✅ BRAND + TIME-BASED - Hôm nay, mới nhất
    brandTime: [
        'ketqua xsmn hôm nay', 'ket qua xsmn hom nay',
        'ketqua xsmb hôm nay', 'ket qua xsmb hom nay',
        'ketqua xsmt hôm nay', 'ket qua xsmt hom nay',
        'ketquamn xsmn hôm nay', 'ketquamn xsmb hôm nay',
        'ketquamn.com xsmn hôm nay', 'ketquamn.com ket qua xsmn',
        'ket qua mn xsmn hôm nay', 'ket qua mn xsmb hom nay',
    ],
    // ✅ BRAND + ACTION - Tra cứu, thống kê
    brandAction: [
        'xổ số ketquamn', 'xo so ketquamn', 'xổ số ket qua mn',
        'ketquamn kết quả xổ số', 'ket qua mn ket qua xo so',
        'ketquamn tra cứu', 'ket qua mn tra cuu',
        'ketquamn thống kê', 'ket qua mn thong ke',
        'ketquamn soi cầu', 'ket qua mn soi cau',
    ],
    noDiacritics: [
        'ket qua MN',
        'ket qua xo so mien Nam',
        'ket qua xsmn',
        'ket qua MN',
    ],
    noSpace: [
        'ketquamn',
        'ketquamn.com',
        'KETQUAMN.COM',
        // ✅ SHORT ABBREVIATIONS - Viết tắt ngắn (giống RBK)
        'ketquamn', 'KETQUAMN', 'KetQuaMN',
        'kqmn', 'KQMN', 'KqMN',
        'ketqua', 'KETQUA', // Kết Quả
    ],
    hyphenated: [
        'tao-dan-de-ketquamn',
        'tao-dan-de-ket-qua-mn',
        'tạo-dàn-đề-ketquamn',
    ],
    misspellings: [
        // Sai chính tả phổ biến
        'tạo dan de ketquamn',
        'tao dàn đề ketquamn',
        'tạo dàn đê ketquamn',
        'tao dan đe ketquamn',
        'taodande ketquamn',
        'tao dande ketquamn',
        'tạo đàn đề ketquamn',
        'tao dan de ketqua mn',
        'tạo dàn đề ketquamn',

        // Thiếu chữ
        'tao dan ketquamn',
        'tạo dàn ketquamn',
        'dan de ketquamn',

        // Viết liền một phần
        'taodande ketquamn',
        'tao dande ketquamn',
        'taodàn đề ketquamn',

        // Mixed dấu
        'tạo dan dề ketquamn',
        'tao dàn de ketquamn',
        'tạo đan de ketquamn',
    ],
    withDomain: [
        'ketquamn pro',
        'ketquamn.com',
        'web tạo dàn đề ketquamn',
        'website tao dan de ketquamn',
        // ✅ SHORT ABBREVIATIONS với domain
        'ketquamn.pro',
        'ketquamn pro',
        'kqmn.pro',
        'ketquamn.com',
        'ketquamn.pro',
    ],
    
    // ✅ SHORT ABBREVIATIONS - Section riêng cho viết tắt ngắn (giống RBK strategy)
    shortAbbreviations: [
        'ketquamn', 'KETQUAMN', 'ket qua mn', 'KET QUA MN', // Kết Quả MN
        'kqmn', 'KQMN', 'kq mn', 'KQ MN', // Kết Quả MN
        'ketqua', 'KETQUA', 'ket qua', 'KET QUA', // Kết Quả
        'kqmn', 'KQMN', 'kq mn', 'KQ MN', // Kết Quả MN
        'ketquamn', 'KETQUAMN', // Kết Quả MN
        'ketquamn', 'KETQUAMN', // Kết Quả MN
        // With context
        'ketquamn xổ số', 'ketquamn xo so',
        'ketquamn loto', 'ketquamn lô đề',
        'kqmn tool', 'kqmn công cụ',
        'ketquamn.pro', 'ketquamn pro',
    ]
};

/**
 * CORE PRODUCT KEYWORDS - Từ khóa sản phẩm chính
 */
const PRODUCT_KEYWORDS = {
    // Tạo dàn đề
    taoDanDe: [
        'tạo dàn đề',
        'tao dan de',
        'tạo dan đề',
        'tao dàn de',
        'tạo đàn đề',
        'taodande',
        'tao-dan-de',
        'tạo-dàn-đề',

        // Với "online"
        'tạo dàn đề online',
        'tao dan de online',
        'tạo dàn đề trực tuyến',

        // Với "miễn phí"
        'tạo dàn đề miễn phí',
        'tao dan de mien phi',
        'tạo dàn đề free',
    ],

    // Tạo dàn số
    taoDanSo: [
        'tạo dàn số',
        'tao dan so',
        'tạo dan số',
        'tao dàn so',
        'tạo đàn số',
        'taodanso',
        'tạo-dàn-số',
        'tao-dan-so',
        'tạo_dàn_số',
        'tao_dan_so',

        'tạo dàn số online',
        'tao dan so online',
        'tạo dàn số miễn phí',
        
        // Đồng nghĩa
        'lập dàn số',
        'lap dan so',
        'lập dàn',
        'lap dan',
    ],

    // Tạo mức số
    taoMucSo: [
        'tạo mức số',
        'tao muc so',
        'tạo muc số',
        'tao mức so',
        'taomucso',

        'ứng dụng mức số',
        'ung dung muc so',
        'app mức số',
    ],

    // Dàn đề variants
    danDe: [
        'dàn đề',
        'dan de',
        'dàn de',
        'dan đề',
        'đàn đề',
        'dande',

        // With numbers
        'dàn đề 2d',
        'dan de 2d',
        'dàn đề 3d',
        'dàn đề 4d',
        'dàn đề 9x0x',
        'dan de 9x0x',

        // With actions
        'tạo dàn đề',
        'ghép dàn đề',
        'lọc dàn đề',
        'nuôi dàn đề',
    ],

    // Lô đề, lô tô variants
    loDe: [
        'lô đề',
        'lo de',
        'lô de',
        'lo đề',
        'ló đề',
        'ló tô',
        'lô tô',
        'lo to',
        'loto',
        'lotô',

        // Misspellings
        'lo đe',
        'lô đe',
        'ló đe',
    ],

    // Dàn 9x-0x
    dan9x0x: [
        'dàn 9x0x',
        'dan 9x0x',
        'dàn 9x-0x',
        'dan 9x-0x',
        'dàn 9x 0x',

        'dàn 9x',
        'dan 9x',
        'dàn 0x',
        'dan 0x',

        'tạo dàn 9x0x',
        'tao dan 9x0x',
        'tạo dàn 9x-0x',
    ],

    // Dàn 2D
    dan2d: [
        'dàn 2d',
        'dan 2d',
        'dàn 2D',
        'dan2d',

        'dàn đề 2d',
        'dan de 2d',
        'dàn số 2d',

        'tạo dàn 2d',
        'tao dan 2d',
    ],

    // Dàn 3D/4D
    dan3d4d: [
        'dàn 3d',
        'dan 3d',
        'dàn 4d',
        'dan 4d',
        'dàn 3d4d',
        'dan 3d4d',

        'dàn 3 càng',
        'dan 3 cang',
        'dàn 4 càng',

        'tạo dàn 3d',
        'tao dan 3d',
        'tạo dàn de 3d',
    ]
};

/**
 * FEATURE KEYWORDS - Từ khóa tính năng
 */
const FEATURE_KEYWORDS = {
    // Lọc ghép dàn
    locGhep: [
        'lọc ghép dàn đề',
        'loc ghep dan de',
        'lọc ghép dàn',
        'loc ghep dan',
        'lọc dàn đề',
        'ghép dàn đề',

        'lọc ghép số',
        'loc ghep so',
        'ghép dàn số',
    ],

    // Lấy nhanh
    layNhanh: [
        'lấy nhanh dàn đề',
        'lay nhanh dan de',
        'lấy nhanh dàn số',
        'lay nhanh dan so',
        'tạo dàn nhanh',
        'tao dan nhanh',
    ],

    // Nuôi dàn
    nuoiDan: [
        'nuôi dàn đề',
        'nuoi dan de',
        'nuôi dàn',
        'nuoi dan',
        'nuôi dàn khung',
        'nuoi dan khung',

        'nuôi dàn 3 ngày',
        'nuôi dàn 5 ngày',
        'nuôi dàn khung 3 ngày',
    ],

    // Soi cầu
    soiCau: [
        'soi cầu',
        'soi cau',
        'soi cầu lô đề',
        'soi cau lo de',
        'soi cầu xổ số',
        'soi cau xo so',

        'soi cầu miền bắc',
        'soi cầu mb',
        'soi cầu mn',
        'soi cầu mt',
    ],

    // Thống kê
    thongKe: [
        'thống kê xổ số',
        'thong ke xo so',
        'thống kê 3 miền',
        'thong ke 3 mien',

        'thống kê lô đề',
        'thong ke lo de',
        'bảng thống kê',
        'bang thong ke',
    ],

    // Ghép xiên
    ghepXien: [
        'ghép xiên',
        'ghep xien',
        'ghép lô xiên',
        'ghep lo xien',
        'xiên quay',
        'xien quay',

        'ghép lotto',
        'ghep lotto',
        'xiên 2',
        'xiên 3',
        'xiên 4',
    ]
};

/**
 * SEARCH ENGINE SPECIFIC KEYWORDS
 * Từ khóa tối ưu riêng cho từng search engine
 */
const SEARCH_ENGINE_KEYWORDS = {
    // Google - Long-tail questions
    google: [
        'cách tạo dàn đề hiệu quả',
        'tạo dàn đề như thế nào',
        'app tạo dàn đề nào tốt',
        'web tạo dàn đề uy tín',
        'công cụ tạo dàn đề chuyên nghiệp',
        'phần mềm tạo dàn đề miễn phí',
    ],

    // Bing - More formal queries
    bing: [
        'ứng dụng tạo dàn đề',
        'phần mềm tạo mức số',
        'công cụ lô đề online',
        'hệ thống tạo dàn số',
        'giải pháp tạo dàn đề',
    ],

    // Cốc Cốc - Vietnamese-specific
    coccoc: [
        'tạo dàn đề việt nam',
        'app tạo dàn đề tiếng việt',
        'web tạo dàn đề vn',
        'công cụ lô đề việt',
        'tạo dàn số miền bắc',
        'tạo dàn số 3 miền',
    ]
};

/**
 * LOCATION KEYWORDS - Từ khóa theo vị trí
 */
const LOCATION_KEYWORDS = {
    vietnam: [
        'tạo dàn đề việt nam',
        'tao dan de viet nam',
        'tạo dàn đề vn',
        'tao dan de vn',
    ],

    regions: [
        'tạo dàn đề miền bắc',
        'tạo dàn đề miền nam',
        'tạo dàn đề miền trung',
        'tao dan de mien bac',
        'tao dan de mien nam',
        'tao dan de mien trung',

        'xổ số miền bắc',
        'xổ số miền nam',
        'xổ số miền trung',
        'xs mb',
        'xs mn',
        'xs mt',
        'xsmb',
        'xsmn',
        'xsmt',
    ]
};

/**
 * COMPETITOR KEYWORDS - Từ khóa đối thủ cạnh tranh
 * Bao gồm: Tên đối thủ, so sánh, và keywords để cạnh tranh khi người dùng tìm đối thủ
 */
const COMPETITOR_KEYWORDS = [
    // ✅ KangDH.com - Đối thủ lớn nhất
    'kangdh', 'kang dh', 'kangdh.com', 'kangdh.com.vn',
    'kangdh tạo dàn', 'kangdh tạo dàn số', 'kangdh tạo dàn đề',
    'kangdh taodanxoso', 'taodanxoso', 'tao dan xo so',
    'tốt hơn kangdh', 'tot hon kangdh', 'kangdh vs ketquamn',
    'kangdh alternative', 'thay thế kangdh',
    
    // ✅ GiaiMaSoHoc.net - Đối thủ lớn
    'giai ma so hoc', 'giải mã số học', 'giaimasohoc', 'giaimasohoc.net',
    'giai ma so hoc tạo dàn', 'giải mã số học tạo dàn số',
    'giaimasohoc tạo dàn đề', 'giaimasohoc tool',
    'tốt hơn giaimasohoc', 'tot hon giaimasohoc', 'giaimasohoc vs ketquamn',
    'giaimasohoc alternative',
    
    // ✅ SieuKetQua.com - Đối thủ lớn
    'sieu ket qua', 'sieuketqua', 'sieuketqua.com',
    'sieuketqua tạo dàn', 'sieu ket qua tạo dàn xổ số',
    'sieuketqua tool', 'sieuketqua công cụ',
    'tốt hơn sieuketqua', 'tot hon sieuketqua', 'sieuketqua vs ketquamn',
    
    // ✅ DanhCongi.com - Đối thủ
    'danhcongi', 'danhcongi.com', 'danh con gi',
    'danhcongi tạo dàn', 'danhcongi tool',
    'tốt hơn danhcongi', 'tot hon danhcongi',
    
    // ✅ Lottoat.com - Đối thủ
    'lottoat', 'lottoat.com', 'xoso.lottoat.com',
    'lottoat tạo dàn', 'lottoat tool',
    'tốt hơn lottoat', 'tot hon lottoat',
    
    // ✅ Quynh.vn - Đối thủ
    'quỳnh.vn', 'quynh.vn', 'quynh tạo dàn đề',
    'quynh tool', 'tốt hơn quynh',
    
    // ✅ Olawin - Đối thủ
    'olawin', 'tạo dàn olawin', 'olawin tool',
    'tốt hơn olawin',
    
    // ✅ Các đối thủ khác
    'dande pro', 'dan de pro', 'dàn đề pro',
    'phần mềm tạo dàn số', 'phan mem tao dan so',
    'ứng dụng tạo dàn số', 'ung dung tao dan so',
    
    // ✅ COMPARISON KEYWORDS - Từ khóa so sánh
    'tạo dàn đề tốt nhất', 'tao dan de tot nhat',
    'web tạo dàn đề uy tín', 'app tạo dàn số nào tốt',
    'công cụ tạo dàn đề chuyên nghiệp', 'cong cu tao dan de chuyen nghiep',
    'phần mềm tạo dàn đề miễn phí', 'phan mem tao dan de mien phi',
    'tạo dàn đề free', 'tao dan de free',
    'tạo dàn đề không quảng cáo', 'tao dan de khong quang cao',
    
    // ✅ ALTERNATIVE KEYWORDS - Thay thế đối thủ
    'thay thế kangdh', 'thay the kangdh',
    'kangdh alternative', 'giaimasohoc alternative',
    'sieuketqua alternative', 'kangdh thay the',
    
    // ✅ NO GAME - Tránh nhầm với game Black Myth: Wukong
    'ketquamn không phải game', 'ketquamn khong phai game',
    'ketquamn công cụ xổ số', 'ketquamn cong cu xo so',
    'ketquamn tool xổ số', 'ketquamn tool xo so',
    'ketquamn tạo dàn đề', 'ketquamn tao dan de',
    'ketquamn dàn đề', 'ketquamn dan de',
    'ketquamn loto', 'ketquamn xổ số', 'ketquamn xo so',
    'ketquamn soi cầu', 'ketquamn soi cau',
    'ketquamn thống kê', 'ketquamn thong ke',
    'dàn đề ketquamn khác game', 'dan de ketquamn khac game',
    'ketquamn khác black myth', 'ketquamn khac black myth',
    
    // ✅ COMPETITIVE LONG-TAIL
    'kangdh vs ketquamn', 'kangdh vs ketquamn',
    'giaimasohoc vs ketquamn', 'sieuketqua vs ketquamn',
    'so sánh kangdh và ketquamn', 'so sanh kangdh va ketquamn',
    'ketquamn tốt hơn kangdh', 'ketquamn tot hon kangdh'
];

/**
 * YEAR-BASED KEYWORDS - Từ khóa theo năm
 */
const YEAR_KEYWORDS = [
    'tạo dàn đề 2025',
    'tao dan de 2025',
    'tạo dàn đề mới nhất',
    'tao dan de moi nhat',
    'tạo dàn đề hôm nay',
    'tao dan de hom nay',
];

/**
 * ⭐ PAGE-SPECIFIC KEYWORD VARIATIONS ⭐
 * Kết hợp BRAND + FEATURE cho TỪNG PAGE cụ thể
 * Bao quát MỌI CÁCH GÕ có thể của người dùng
 */
const PAGE_SPECIFIC_KEYWORDS = {
    /**
     * DÀN 9X-0X PAGE - Brand + 9x0x variations
     */
    dan9x0x: [
        // ✅ Có dấu
        'tạo dàn đề ketquamn 9x0x', 'tạo dàn ketquamn 9x0x', 'dàn đề ketquamn 9x0x',
        'tạo dàn đề ketquamn 9x-0x', 'dàn ketquamn 9x0x',

        // ✅ Không dấu
        'tao dan de ketquamn 9x0x', 'tao dan ketquamn 9x0x', 'dan de ketquamn 9x0x',
        'tao dan ketquamn 9x-0x', 'dan ketquamn 9x0x',

        // ✅ Viết liền (NO SPACE) - Người dùng hay gõ
        'ketquamn9x0x', 'ketquamn 9x0x',
        'taodanketquamn9x0x', 'taodanketquamn 9x0x',
        'taodande9x0x', 'taodan9x0x', 'taodan9x',
        'ketquamn9x0x', 'ketquamn9x',

        // ✅ Partial spacing
        'tao dan ketquamn9x0x', 'tao danketquamn 9x0x',
        'taodande ketquamn 9x0x', 'tao dande ketquamn9x0x',

        // ✅ Hyphen variations
        'tao-dan-de-ketquamn-9x0x', 'tao-dan-ketquamn-9x0x',

        // ✅ Shortened/Viết tắt
        'tao dan ketquamn 9x', 'tao dan 9x0x', 'taodanketquamn9x',
        'ketquamn 9x0x', 'ketquamn 9x', '9x0x ketquamn', '9x ketquamn',

        // ✅ Mixed diacritics (lẫn dấu)
        'tạo dan ketquamn 9x0x', 'tao dàn ketquamn 9x0x',
        'tạo dàn ketquamn9x0x', 'tao dan de ketquamn9x0x',

        // ✅ With modifiers
        'tạo dàn ketquamn 9x0x online', 'tao dan ketquamn 9x0x online',
        'tạo dàn 9x0x ketquamn miễn phí', 'tao dan 9x0x ketquamn',
    ],

    /**
     * DÀN 2D PAGE - Brand + 2d variations
     */
    dan2d: [
        // ✅ Có dấu
        'tạo dàn đề ketquamn 2d', 'tạo dàn 2d ketquamn', 'dàn đề 2d ketquamn',
        'dàn 2d ketquamn', 'tạo dàn lô đề 2d ketquamn',

        // ✅ Không dấu
        'tao dan de ketquamn 2d', 'tao dan 2d ketquamn', 'dan de 2d ketquamn',
        'dan 2d ketquamn', 'tao dan lo de 2d ketquamn',

        // ✅ Viết liền
        'ketquamn2d', 'ketquamn 2d',
        'taodanketquamn2d', 'taodanketquamn 2d',
        'taodande2d', 'taodan2d',
        'ketquamn2d',

        // ✅ Partial spacing
        'tao dan ketquamn2d', 'tao danketquamn 2d',
        'taodande ketquamn 2d', 'tao dande ketquamn2d',

        // ✅ Shortened
        'tao dan ketquamn 2d', 'taodan2d ketquamn',
        'ketquamn 2d', '2d ketquamn',

        // ✅ Mixed
        'tạo dan ketquamn 2d', 'tao dàn ketquamn 2d',
        'tạo dàn ketquamn2d',

        // ✅ With lô đề
        'lô đề 2d ketquamn', 'lo de 2d ketquamn', 'lode2d ketquamn',
    ],

    /**
     * DÀN 3D-4D PAGE - Brand + 3d/4d variations
     */
    dan3d4d: [
        // ✅ 3D variations
        'tạo dàn đề ketquamn 3d', 'tao dan de ketquamn 3d', 'ketquamn3d',
        'taodanketquamn3d', 'taodande3d', 'taodan3d', 'ketquamn3d', 'ketquamn 3d',
        'dàn 3d ketquamn', 'dan 3d ketquamn', '3d ketquamn',

        // ✅ 4D variations
        'tạo dàn đề ketquamn 4d', 'tao dan de ketquamn 4d', 'ketquamn4d',
        'taodanketquamn4d', 'taodande4d', 'taodan4d', 'ketquamn4d', 'ketquamn 4d',
        'dàn 4d ketquamn', 'dan 4d ketquamn', '4d ketquamn',

        // ✅ 3D4D combined
        'tạo dàn 3d4d ketquamn', 'tao dan 3d4d ketquamn',
        'taodanketquamn3d4d', 'taodan3d4d', 'ketquamn 3d4d', 'ketquamn3d4d',

        // ✅ 3 càng / 4 càng
        'tạo dàn 3 càng ketquamn', 'tao dan 3 cang ketquamn',
        'tạo dàn 4 càng ketquamn', 'tao dan 4 cang ketquamn',
        '3 cang ketquamn', '4 cang ketquamn',
    ],

    /**
     * DÀN ĐẶC BIỆT PAGE
     */
    danDacBiet: [
        'tạo dàn đặc biệt ketquamn', 'tao dan dac biet ketquamn',
        'dàn đặc biệt ketquamn', 'dan dac biet ketquamn',
        'taodandacbietketquamn', 'taodandacbiet ketquamn',
        'lọc ghép dàn ketquamn', 'loc ghep dan ketquamn',
        'lọc ghép dàn đề ketquamn', 'locghepdan ketquamn',
        'lấy nhanh dàn đề ketquamn', 'lay nhanh dan de ketquamn',
        'dàn 36 số ketquamn', 'dan 36 so ketquamn',
        'dàn 50 số ketquamn', 'dan50so ketquamn',
        'ketquamn dac biet', 'ketquamn đặc biệt',
    ],

    /**
     * THỐNG KÊ PAGE
     */
    thongKe: [
        'thống kê ketquamn', 'thong ke ketquamn',
        'thống kê xổ số ketquamn', 'thong ke xo so ketquamn',
        'thống kê 3 miền ketquamn', 'thong ke 3 mien ketquamn',
        'thongkeketquamn', 'thongke ketquamn',
        'ketquamn thong ke', 'ketquamn thống kê',
        'tk ketquamn', 'tkxs ketquamn',
    ],

    /**
     * GHÉP LÔ XIÊN PAGE
     */
    ghepLoXien: [
        'ghép lô xiên ketquamn', 'ghep lo xien ketquamn',
        'ghép xiên ketquamn', 'ghep xien ketquamn',
        'xiên quay ketquamn', 'xien quay ketquamn',
        'gheploxienketquamn', 'ghepxienketquamn',
        'ghép lotto Kết Quả MN', 'ghep lotto ketquamn',
        'Kết Quả MN xien', 'ketquamn xiên', 'Kết Quả MN lotto',
    ],

    /**
     * SOI CẦU BAYESIAN PAGE - NEW HIGH PRIORITY
     * Primary: soi cầu miền bắc hôm nay, dự đoán XSMB, soi cầu MB
     * Secondary: thống kê vị trí XSMB, phân tích xổ số miền Bắc
     */
    soiCauBayesian: [
        // ✅ PRIMARY KEYWORDS - Từ khóa chính có volume cao
        'soi cầu miền bắc hôm nay', 'soi cau mien bac hom nay',
        'dự đoán XSMB hôm nay', 'du doan XSMB hom nay',
        'soi cầu MB hôm nay', 'soi cau MB hom nay',
        'soi cầu miền bắc', 'soi cau mien bac',
        'dự đoán XSMB', 'du doan XSMB',
        'soi cầu MB', 'soi cau MB',

        // ✅ BRAND + FEATURE COMBINATIONS
        'soi cầu Kết Quả MN', 'soi cau ketquamn',
        'soi cầu miền bắc Kết Quả MN', 'soi cau mien bac ketquamn',
        'dự đoán XSMB Kết Quả MN', 'du doan XSMB ketquamn',
        'soi cầu MB Kết Quả MN', 'soi cau MB ketquamn',
        'Kết Quả MN soi cầu', 'ketquamn soi cau',
        'Kết Quả MN dự đoán XSMB', 'ketquamn du doan XSMB',

        // ✅ LONG-TAIL KEYWORDS - Câu hỏi người dùng
        'soi cầu miền bắc hôm nay chính xác', 'soi cau mien bac hom nay chinh xac',
        'dự đoán XSMB hôm nay chuẩn', 'du doan XSMB hom nay chuan',
        'soi cầu MB hôm nay miễn phí', 'soi cau MB hom nay mien phi',
        'soi cầu miền bắc online', 'soi cau mien bac online',
        'dự đoán xổ số miền bắc hôm nay', 'du doan xo so mien bac hom nay',
        'soi cầu xổ số miền bắc', 'soi cau xo so mien bac',

        // ✅ TIME-BASED KEYWORDS - Theo thời gian
        'soi cầu miền bắc ngày mai', 'soi cau mien bac ngay mai',
        'dự đoán XSMB ngày mai', 'du doan XSMB ngay mai',
        'soi cầu MB ngày mai', 'soi cau MB ngay mai',
        'soi cầu miền bắc tuần này', 'soi cau mien bac tuan nay',
        'dự đoán XSMB tuần này', 'du doan XSMB tuan nay',

        // ✅ METHOD-SPECIFIC KEYWORDS - Phương pháp cụ thể
        'soi cầu Bayesian miền bắc', 'soi cau Bayesian mien bac',
        'dự đoán Bayesian XSMB', 'du doan Bayesian XSMB',
        'soi cầu thống kê miền bắc', 'soi cau thong ke mien bac',
        'phân tích Bayesian XSMB', 'phan tich Bayesian XSMB',
        'soi cầu AI miền bắc', 'soi cau AI mien bac',
        'dự đoán AI XSMB', 'du doan AI XSMB',

        // ✅ COMPETITIVE KEYWORDS - Đối thủ cạnh tranh (MỞ RỘNG)
        // XSKT.COM.VN
        'soi cầu miền bắc xskt', 'soi cau mien bac xskt',
        'soi cầu xskt', 'soi cau xskt',
        'xskt soi cầu', 'xskt soi cau',
        'soi cầu tốt hơn xskt', 'soi cau tot hon xskt',
        'xskt.com.vn soi cầu', 'xskt.com.vn soi cau',
        
        // XOSOTHANTAI.MOBI
        'soi cầu miền bắc xosothantai', 'soi cau mien bac xosothantai',
        'soi cầu xosothantai', 'soi cau xosothantai',
        'xosothantai soi cầu', 'xosothantai soi cau',
        'soi cầu tốt hơn xosothantai', 'soi cau tot hon xosothantai',
        'xosothantai.mobi soi cầu', 'xosothantai.mobi soi cau',
        
        // XSMN247.ME / XSMN247
        'soi cầu miền bắc xsmn247', 'soi cau mien bac xsmn247',
        'soi cầu xsmn247', 'soi cau xsmn247',
        'xsmn247 soi cầu', 'xsmn247 soi cau',
        'soi cầu tốt hơn xsmn247', 'soi cau tot hon xsmn247',
        'xsmn247.me soi cầu', 'xsmn247.me soi cau',
        'xổ số minh ngọc 247 soi cầu', 'xo so minh ngoc 247 soi cau',
        
        // ATRUNGROI.COM
        'soi cầu miền bắc atrungroi', 'soi cau mien bac atrungroi',
        'soi cầu atrungroi', 'soi cau atrungroi',
        'atrungroi soi cầu', 'atrungroi soi cau',
        'soi cầu tốt hơn atrungroi', 'soi cau tot hon atrungroi',
        'atrungroi.com soi cầu', 'atrungroi.com soi cau',
        'a trúng rồi soi cầu', 'a trung roi soi cau',
        
        // XOSO.COM.VN
        'soi cầu miền bắc xoso', 'soi cau mien bac xoso',
        'soi cầu xoso', 'soi cau xoso',
        'xoso.com.vn soi cầu', 'xoso.com.vn soi cau',
        'thống kê vị trí xoso', 'thong ke vi tri xoso',
        
        // XSMN.MOBI
        'soi cầu xsmn.mobi', 'soi cau xsmn.mobi',
        'xsmn.mobi soi cầu', 'xsmn.mobi soi cau',
        'soi cầu tốt hơn xsmn.mobi', 'soi cau tot hon xsmn.mobi',
        
        // KQXSMB.MOBI
        'soi cầu kqxsmb.mobi', 'soi cau kqxsmb.mobi',
        'kqxsmb.mobi soi cầu', 'kqxsmb.mobi soi cau',
        
        // SOICAUMIENPHI.ORG
        'soi cầu miễn phí 888', 'soi cau mien phi 888',
        'soi cầu miễn phí tốt nhất', 'soi cau mien phi tot nhat',
        'soicaumienphi.org soi cầu', 'soicaumienphi soi cau',
        
        // XOSODAIPHAT
        'soi cầu xosodaiphat', 'soi cau xosodaiphat',
        'xosodaiphat soi cầu', 'xosodaiphat soi cau',
        
        // COMPARISON KEYWORDS
        'soi cầu nào tốt nhất', 'soi cau nao tot nhat',
        'soi cầu uy tín nhất', 'soi cau uy tin nhat',
        'soi cầu chính xác nhất', 'soi cau chinh xac nhat',
        'soi cầu miền bắc nào đáng tin', 'soi cau mien bac nao dang tin',

        // ✅ STATISTICAL KEYWORDS - Thống kê
        'thống kê vị trí XSMB', 'thong ke vi tri XSMB',
        'phân tích xổ số miền Bắc', 'phan tich xo so mien Bac',
        'thống kê XSMB hôm nay', 'thong ke XSMB hom nay',
        'bảng thống kê XSMB', 'bang thong ke XSMB',
        'tần suất xuất hiện XSMB', 'tan suat xuat hien XSMB',
        'số nóng số lạnh XSMB', 'so nong so lanh XSMB',

        // ✅ REGIONAL VARIATIONS - Biến thể theo vùng
        'soi cầu xsmb', 'soi cau xsmb',
        'dự đoán xsmb', 'du doan xsmb',
        'soi cầu xổ số miền bắc', 'soi cau xo so mien bac',
        'soi cầu miền bắc 3 miền', 'soi cau mien bac 3 mien',
        'soi cầu miền bắc 24h', 'soi cau mien bac 24h',

        // ✅ ACCURACY KEYWORDS - Độ chính xác
        'soi cầu miền bắc chính xác 100%', 'soi cau mien bac chinh xac 100%',
        'dự đoán XSMB chuẩn nhất', 'du doan XSMB chuan nhat',
        'soi cầu MB siêu chuẩn', 'soi cau MB sieu chuan',
        'soi cầu miền bắc uy tín', 'soi cau mien bac uy tin',
        'soi cầu miền bắc chuyên nghiệp', 'soi cau mien bac chuyen nghiep',

        // ✅ FREE KEYWORDS - Miễn phí
        'soi cầu miền bắc miễn phí', 'soi cau mien bac mien phi',
        'dự đoán XSMB miễn phí', 'du doan XSMB mien phi',
        'soi cầu MB free', 'soi cau MB free',
        'soi cầu miền bắc không mất phí', 'soi cau mien bac khong mat phi',

        // ✅ MOBILE KEYWORDS - Di động
        'soi cầu miền bắc mobile', 'soi cau mien bac mobile',
        'soi cầu XSMB app', 'soi cau XSMB app',
        'dự đoán XSMB điện thoại', 'du doan XSMB dien thoai',
        'soi cầu miền bắc wap', 'soi cau mien bac wap',

        // ✅ TECHNICAL KEYWORDS - Kỹ thuật
        'soi cầu miền bắc thuật toán', 'soi cau mien bac thuat toan',
        'dự đoán XSMB machine learning', 'du doan XSMB machine learning',
        'soi cầu MB AI', 'soi cau MB AI',
        'phân tích dữ liệu XSMB', 'phan tich du lieu XSMB',
        'soi cầu miền bắc big data', 'soi cau mien bac big data',

        // ✅ MISSING DIACRITICS - Thiếu dấu
        'soi cau mien bac', 'soi cau MB',
        'du doan XSMB', 'du doan xsmb',
        'soi cau xo so mien bac', 'soi cau xsmb',
        'thong ke vi tri XSMB', 'thong ke XSMB',

        // ✅ SPACING VARIATIONS - Biến thể khoảng trắng
        'soicau mien bac', 'soicauMB',
        'dudoan XSMB', 'dudoanxsmb',
        'soicau xsmb', 'soicauxsmb',
        'thongke XSMB', 'thongkexsmb',

        // ✅ HYPHEN VARIATIONS - Biến thể gạch ngang
        'soi-cau-mien-bac', 'soi-cau-MB',
        'du-doan-XSMB', 'du-doan-xsmb',
        'soi-cau-xsmb', 'thong-ke-XSMB',

        // ✅ QUESTION KEYWORDS - Câu hỏi
        'soi cầu miền bắc hôm nay như thế nào', 'soi cau mien bac hom nay nhu the nao',
        'dự đoán XSMB hôm nay ra sao', 'du doan XSMB hom nay ra sao',
        'soi cầu MB hôm nay có chính xác không', 'soi cau MB hom nay co chinh xac khong',
        'cách soi cầu miền bắc hôm nay', 'cach soi cau mien bac hom nay',
        'làm sao để soi cầu XSMB', 'lam sao de soi cau XSMB',

        // ✅ COMPARISON KEYWORDS - So sánh
        'soi cầu miền bắc tốt nhất', 'soi cau mien bac tot nhat',
        'dự đoán XSMB chính xác nhất', 'du doan XSMB chinh xac nhat',
        'soi cầu MB uy tín nhất', 'soi cau MB uy tin nhat',
        'soi cầu miền bắc nào tốt', 'soi cau mien bac nao tot',

        // ✅ URGENCY KEYWORDS - Khẩn cấp
        'soi cầu miền bắc hôm nay gấp', 'soi cau mien bac hom nay gap',
        'dự đoán XSMB hôm nay nhanh', 'du doan XSMB hom nay nhanh',
        'soi cầu MB hôm nay khẩn cấp', 'soi cau MB hom nay khan cap',
        'soi cầu miền bắc hôm nay ngay', 'soi cau mien bac hom nay ngay'
    ],
    
    /**
     * KẾT QUẢ XỔ SỐ MIỀN BẮC (KQXS) PAGE
     * PRIMARY: xsmb (673,000), kết quả xổ số miền bắc (201,000)
     * SECONDARY: XSMB hôm nay, XSMB 30 ngày, XSMB trực tiếp
     */
    kqxs: [
        // ✅ PRIMARY KEYWORDS
        'xsmb', 'XSMB', 'xs mb', 'xổ số mb',
        'kết quả xổ số miền bắc', 'ket qua xo so mien bac',
        'sxmb', 'SXMB', 'sx mb',
        'kqxsmb', 'KQXSMB', 'kq xsmb', 'kqxs mb',
        'xstd', 'XSTD', 'xổ số thủ đô',
        
        // ✅ TIME-BASED
        'xsmb hôm nay', 'xsmb hom nay', 'XSMB hôm nay',
        'xsmb 30 ngày', 'xsmb 30 ngay', 'XSMB 30 ngày',
        'xsmb hôm qua', 'xsmb hom qua', 'XSMB hôm qua',
        'xsmb 90 ngày', 'xsmb 90 ngay',
        
        // ✅ DAY-OF-WEEK
        'xsmb thứ 2', 'xsmb thu 2', 'XSMB thứ 2', 'xsmb thứ hai',
        'xsmb thứ 3', 'xsmb thu 3', 'XSMB thứ 3', 'xsmb thứ ba',
        'xsmb thứ 4', 'xsmb thu 4', 'XSMB thứ 4', 'xsmb thứ tư',
        'xsmb thứ 5', 'xsmb thu 5', 'XSMB thứ 5', 'xsmb thứ năm',
        'xsmb thứ 6', 'xsmb thu 6', 'XSMB thứ 6', 'xsmb thứ sáu',
        'xsmb thứ 7', 'xsmb thu 7', 'XSMB thứ 7', 'xsmb thứ bảy',
        'xsmb chủ nhật', 'xsmb chu nhat', 'XSMB chủ nhật',
        
        // ✅ ACTION
        'xsmb trực tiếp', 'xsmb truc tiep', 'XSMB trực tiếp',
        'tường thuật xsmb', 'tuong thuat xsmb',
        'xem xsmb trực tiếp', 'xem xsmb truc tiep',
        
        // ✅ COMPETITIVE
        'xsmb xosodaiphat', 'xosodaiphat xsmb',
        'xsmb xoso.com.vn', 'xoso.com.vn xsmb',
        'xsmb xskt.com.vn', 'xskt.com.vn xsmb',
        'xsmb xsmn.mobi', 'xsmn.mobi xsmb',
        'xsmb az24.vn', 'az24.vn xsmb',
        'xsmb nào tốt nhất', 'xsmb nao tot nhat',
        
        // ✅ VARIATIONS
        'xsmb', 'xs-mb', 'xs_mb', 'xs mb',
        'kqxsmb', 'kq-xsmb', 'kq_xsmb',
        'xosomienbac', 'ketquaxoso',
        'XSMB', 'XSMb', 'XsMb'
    ]
};

/**
 * Hàm lấy tất cả keywords cho một page
 * ✅ Enhanced với PAGE_SPECIFIC_KEYWORDS
 */
function getAllKeywordsForPage(pageType) {
    let keywords = [];

    // ✅ 1. BRAND KEYWORDS (common for all pages)
    keywords.push(
        ...BRAND_KEYWORDS.primary.slice(0, 10),
        ...BRAND_KEYWORDS.noDiacritics.slice(0, 10),
        ...BRAND_KEYWORDS.noSpace.slice(0, 8),
        ...BRAND_KEYWORDS.misspellings.slice(0, 15)
    );

    // ✅ 2. PAGE-SPECIFIC KEYWORDS (Brand + Feature Combined) - MỚI!
    if (PAGE_SPECIFIC_KEYWORDS[pageType]) {
        keywords.push(...PAGE_SPECIFIC_KEYWORDS[pageType]);
    }

    // ✅ 3. PRODUCT & FEATURE KEYWORDS (specific to page type)
    switch (pageType) {
        case 'home':
            keywords.push(
                ...PRODUCT_KEYWORDS.taoDanSo,
                ...PRODUCT_KEYWORDS.taoMucSo,
                ...PRODUCT_KEYWORDS.loDe,
                ...FEATURE_KEYWORDS.locGhep.slice(0, 5),
                ...FEATURE_KEYWORDS.nuoiDan.slice(0, 5),
                ...SEARCH_ENGINE_KEYWORDS.google,
                ...SEARCH_ENGINE_KEYWORDS.bing,
                ...SEARCH_ENGINE_KEYWORDS.coccoc,
                ...YEAR_KEYWORDS,
                // ✅ SHORT ABBREVIATIONS (giống RBK strategy) - Priority cao
                ...BRAND_KEYWORDS.shortAbbreviations
            );
            break;

        case 'dan9x0x':
            keywords.push(
                ...PRODUCT_KEYWORDS.dan9x0x,
                ...FEATURE_KEYWORDS.nuoiDan,
                ...FEATURE_KEYWORDS.locGhep
            );
            break;

        case 'dan2d':
            keywords.push(
                ...PRODUCT_KEYWORDS.dan2d,
                ...PRODUCT_KEYWORDS.loDe
            );
            break;

        case 'dan3d4d':
            keywords.push(
                ...PRODUCT_KEYWORDS.dan3d4d
            );
            break;

        case 'danDacBiet':
            keywords.push(
                ...FEATURE_KEYWORDS.locGhep,
                ...FEATURE_KEYWORDS.layNhanh
            );
            break;

        case 'thongKe':
            keywords.push(
                ...FEATURE_KEYWORDS.thongKe,
                ...FEATURE_KEYWORDS.soiCau,
                ...LOCATION_KEYWORDS.regions
            );
            break;

        case 'ghepLoXien':
            keywords.push(
                ...FEATURE_KEYWORDS.ghepXien
            );
            break;

        case 'soiCauBayesian':
            keywords.push(
                ...PAGE_SPECIFIC_KEYWORDS.soiCauBayesian,
                ...FEATURE_KEYWORDS.soiCau,
                ...FEATURE_KEYWORDS.thongKe,
                ...LOCATION_KEYWORDS.regions
            );
            break;

        case 'kqxs':
            keywords.push(
                ...PAGE_SPECIFIC_KEYWORDS.kqxs,
                ...LOCATION_KEYWORDS.regions
            );
            break;
    }

    // Remove duplicates
    return [...new Set(keywords)];
}

/**
 * Hàm tạo meta description với keyword variations
 */
function generateMetaDescription(pageType, includeVariations = true) {
    const descriptions = {
        home: `Kết Quả MN - Kết quả xổ số miền Nam nhanh nhất, chính xác nhất 2025. Xem kết quả xổ số miền Nam hôm nay, XSMN, KQXSMN trực tiếp. ${includeVariations ? 'Hỗ trợ: xsmn, kqxsmn, sxmn, kết quả xổ số miền Nam, xổ số MN. ' : ''}Miễn phí 100%, không quảng cáo!`,

        dan9x0x: `Tạo dàn 9x-0x (tao dan 9x0x) ngẫu nhiên. Cắt dàn 9x, lọc dàn 9x, nuôi dàn khung 3 ngày. ${includeVariations ? 'Hỗ trợ: dan 9x0x, dan 9x, tao dan 9x. ' : ''}Thuật toán Fisher-Yates. Miễn phí!`,

        dan2d: `Tạo dàn 2D (tao dan 2d), dàn số 2D (00-99). Bạch thủ, song thủ, lô đá 2D. ${includeVariations ? 'Hỗ trợ: dan 2d, lo de 2d, tao muc so 2d. ' : ''}Lấy nhanh dàn đề đặc biệt!`,

        dan3d4d: `Tạo dàn 3D-4D (tao dan 3d 4d). Tách dàn AB-BC-CD. Ghép lotto 3-4 càng. ${includeVariations ? 'Hỗ trợ: dan 3d, dan 4d, dan 3 cang. ' : ''}Cao thủ xổ số!`,

        thongKe: `Thống kê xổ số 3 miền (thong ke xo so). XSMB, XSMN, XSMT realtime. ${includeVariations ? 'Hỗ trợ: thống kê lô đề, bang thong ke, soi cầu. ' : ''}Chính xác 100%!`,

        soiCauBayesian: `Soi cầu miền bắc hôm nay (soi cau mien bac hom nay) chính xác 100%. Dự đoán XSMB, soi cầu MB bằng thuật toán Bayesian. ${includeVariations ? 'Hỗ trợ: du doan XSMB, soi cau MB, thong ke vi tri XSMB. ' : ''}Miễn phí 100%!`,

        'dau-duoi': `Thống kê Đầu Đuôi XSMB chi tiết, nhanh nhất. Phân tích tần suất đầu đuôi loto (00-99), bảng thống kê theo ngày. ${includeVariations ? 'Hỗ trợ: dau duoi lo to, thong ke dau duoi, bang thong ke. ' : ''}Cập nhật realtime, miễn phí 100% tại ketquamn.com!`,

        'lo-gan': `Thống kê Lô Gan XSMB chi tiết hơn xosothantai. Lô gan lâu chưa về, gan cực đại, số khan. ${includeVariations ? 'Hỗ trợ: lo gan, lo khan, so gan, gan max. ' : ''}Phân tích xu hướng, miễn phí 100%!`,

        'giai-dac-biet': `Thống kê Giải Đặc Biệt XSMB nhiều tính năng hơn xskt. Xem giải đặc biệt hôm nay, theo tuần, theo tháng. ${includeVariations ? 'Hỗ trợ: giai dac biet, thong ke giai dac biet. ' : ''}Biểu đồ trực quan, miễn phí 100%!`,

        'tan-suat-loto': `Thống kê Tần Suất Lô Tô XSMB phân tích sâu hơn đối thủ. Số nóng số lạnh (00-99), xuất hiện nhiều nhất. ${includeVariations ? 'Hỗ trợ: tan suat lo to, so nong so lanh. ' : ''}Dữ liệu 30-365 ngày, miễn phí 100%!`,

        'tan-suat-locap': `Thống kê Tần Suất Lô Cặp XSMB công cụ độc quyền. Phân tích XX-YY, số lần xuất hiện riêng lẻ. ${includeVariations ? 'Hỗ trợ: tan suat lo cap, phan tich lo cap. ' : ''}Phần trăm tổng thể, miễn phí 100%!`,

        'giai-dac-biet-tuan': `Thống kê Giải Đặc Biệt Theo Tuần với view lịch (Thứ 2-CN). Chọn tháng/năm, toggle thông tin chi tiết. ${includeVariations ? 'Hỗ trợ: giai dac biet theo tuan, xem theo ngay trong tuan. ' : ''}Phân tích xu hướng, miễn phí 100%!`,

        'kqxs': `XSMB - Kết quả xổ số miền Bắc (xsmb, sxmb, kqxsmb, xstd) hôm nay nhanh nhất, chính xác nhất. Tường thuật trực tiếp lúc 18h15 từ trường quay. Xem XSMB 30 ngày, XSMB hôm qua, XSMB theo thứ. ${includeVariations ? 'Hỗ trợ: ket qua xo so mien bac, xsmb, sxmb, kqxsmb, xstd. ' : ''}Tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn. Miễn phí 100% tại ketquamn.com!`
    };

    return descriptions[pageType] || descriptions.home;
}

/**
 * Hàm generate URL patterns cho từng page
 * Giúp search engines hiểu URL structure
 */
function getURLPatternsForPage(pageType) {
    const patterns = {
        home: [
            '/',
            '/tao-dan-de',
            '/tao-dan-de-ketquamn',
            '/ketquamn'
        ],
        dan9x0x: [
            '/dan-9x0x',
            '/dan-9x-0x',
            '/tao-dan-9x0x',
            '/tao-dan-ketquamn-9x0x'
        ],
        dan2d: [
            '/dan-2d',
            '/tao-dan-2d',
            '/tao-dan-ketquamn-2d'
        ],
        dan3d4d: [
            '/dan-3d4d',
            '/dan-3d',
            '/dan-4d',
            '/tao-dan-3d',
            '/tao-dan-4d'
        ],
        danDacBiet: [
            '/dan-dac-biet',
            '/loc-ghep-dan',
            '/lay-nhanh-dan-de'
        ],
        thongKe: [
            '/thong-ke',
            '/thong-ke-xo-so',
            '/thong-ke-3-mien'
        ],
        ghepLoXien: [
            '/ghep-lo-xien',
            '/ghep-xien',
            '/xien-quay'
        ]
    };

    return patterns[pageType] || [];
}

/**
 * Get all brand keywords (SEO 2025: Chất lượng > Số lượng)
 * Chỉ trả về các keywords tự nhiên, có ý nghĩa
 * @param {string} pageType - Type of page (home, kqxs-xsmn, kqxs-xsmb, etc.)
 * @returns {Array} Array of brand keywords
 */
function getAllBrandKeywords(pageType = 'home') {
    const keywords = [];
    
    // Primary brand keywords (luôn có)
    keywords.push(...BRAND_KEYWORDS.primary);
    
    // Brand + Feature combinations (theo từng trang)
    if (pageType === 'kqxs-xsmn' || pageType === 'home') {
        keywords.push(...BRAND_KEYWORDS.brandFeature.filter(k => k.includes('xsmn') || k.includes('XSMN')));
    }
    if (pageType === 'kqxs-xsmb' || pageType === 'ket-qua-xo-so-mien-bac' || pageType === 'home') {
        keywords.push(...BRAND_KEYWORDS.brandFeature.filter(k => k.includes('xsmb') || k.includes('XSMB')));
    }
    if (pageType === 'kqxs-xsmt' || pageType === 'home') {
        keywords.push(...BRAND_KEYWORDS.brandFeature.filter(k => k.includes('xsmt') || k.includes('XSMT')));
    }
    
    // Brand + Time-based (cho các trang kết quả)
    if (pageType.includes('kqxs') || pageType.includes('ket-qua')) {
        keywords.push(...BRAND_KEYWORDS.brandTime);
    }
    
    // Brand + Action (cho các trang thống kê, soi cầu)
    if (pageType.includes('thong-ke') || pageType.includes('soi-cau')) {
        keywords.push(...BRAND_KEYWORDS.brandAction);
    }
    
    // Remove duplicates
    return [...new Set(keywords)];
}

module.exports = {
    BRAND_KEYWORDS,
    PRODUCT_KEYWORDS,
    FEATURE_KEYWORDS,
    SEARCH_ENGINE_KEYWORDS,
    LOCATION_KEYWORDS,
    COMPETITOR_KEYWORDS,
    YEAR_KEYWORDS,
    PAGE_SPECIFIC_KEYWORDS,
    getAllKeywordsForPage,
    getURLPatternsForPage,
    generateMetaDescription,
    generateAllVariations,
    removeDiacritics,
    getAllBrandKeywords
};

