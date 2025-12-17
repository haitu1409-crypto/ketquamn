import React from 'react';
import styles from '../styles/XSMBSimpleTable.module.css';
import { useXSMBNext, useXSMBNextToday } from '../hooks/useXSMBNext';

/**
 * Component hiển thị bảng kết quả xổ số miền Bắc (XSMB) với thiết kế cổ điển
 * 
 * @param {Object} props - Props của component
 * @param {Object} props.data - Dữ liệu tĩnh (optional)
 * @param {string} props.date - Ngày cụ thể (DD-MM-YYYY) hoặc 'latest'
 * @param {boolean} props.useToday - Sử dụng dữ liệu hôm nay
 * @param {boolean} props.autoFetch - Tự động fetch dữ liệu
 * @param {number} props.refreshInterval - Interval refresh (ms)
 * @param {boolean} props.showLoto - Hiển thị bảng loto
 * @param {boolean} props.showLoading - Hiển thị loading state
 * @param {boolean} props.showError - Hiển thị error state
 * @param {string} props.className - CSS class tùy chỉnh
 * @param {Function} props.onDataLoad - Callback khi load dữ liệu
 * @param {Function} props.onError - Callback khi có lỗi
 */
const XSMBSimpleTable = ({
    data: propData,
    date = 'latest',
    useToday = false,
    autoFetch = true,
    refreshInterval = 0,
    showLoto = true,
    showLoading = true,
    showError = true,
    className = '',
    onDataLoad,
    onError
}) => {
    // ✅ Fix hydration: Chỉ fetch trên client
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sử dụng hook để fetch dữ liệu từ API - chỉ khi đã mount
    const xsmbTodayHook = useXSMBNextToday({
        autoFetch: isMounted && useToday && autoFetch,
        refreshInterval: useToday ? refreshInterval : 0
    });

    const xsmbHook = useXSMBNext({
        date: useToday ? 'latest' : date,
        autoFetch: isMounted && !useToday && autoFetch,
        refreshInterval: !useToday ? refreshInterval : 0
    });

    // Chọn hook phù hợp - ưu tiên useToday nếu được set, ngược lại dùng hook thông thường
    const { data: apiData, loading, error, refetch } = useToday ? xsmbTodayHook : xsmbHook;

    // Debug: Log để kiểm tra dữ liệu (chỉ khi cần thiết)
    if (process.env.NODE_ENV === 'development' && isMounted) {
        console.log('🔍 XSMBSimpleTable data source:', {
            propData: !!propData,
            apiData: !!apiData,
            loading: loading
        });
    }

    // Callback khi dữ liệu được load - sử dụng useRef để tránh vòng lặp
    const dataRef = React.useRef();
    React.useEffect(() => {
        if (apiData && onDataLoad && dataRef.current !== apiData) {
            dataRef.current = apiData;
            onDataLoad(apiData);
        }
    }, [apiData, onDataLoad]);

    // Callback khi có lỗi
    React.useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    // Sử dụng dữ liệu từ API hoặc prop - CHỈ dữ liệu thật, không có fallback
    // ✅ Fix hydration: Chỉ dùng apiData sau khi đã mount trên client
    const data = propData || (isMounted ? apiData : null);

    // ✅ Tối ưu: Memoize function getDayOfWeek - PHẢI đặt trước early return
    const getDayOfWeek = React.useCallback((dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString.split('/').reverse().join('-'));
        const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return days[date.getDay()];
    }, []);

    // ✅ Tối ưu: Memoize formatted date - PHẢI đặt trước early return
    const formattedDate = React.useMemo(() => {
        if (!data?.date) return 'Kết quả XSMB';
        return `${getDayOfWeek(data.date)} - ${data.date}`;
    }, [data?.date, getDayOfWeek]);

    // ✅ Tính toán loto đuôi từ các giải thưởng - PHẢI đặt trước early return để tuân thủ Rules of Hooks
    // ✅ Tối ưu: Sử dụng Set để loại bỏ duplicate nhanh hơn, tối ưu thuật toán
    const calculateLotoDuoi = React.useMemo(() => {
        if (!data) return {};

        // Lấy 2 số cuối từ tất cả các giải - tối ưu: dùng Set để loại bỏ duplicate ngay
        const getLastTwoDigits = (num) => {
            if (!num || typeof num !== 'string') return null;
            return num.slice(-2).padStart(2, '0');
        };

        // Destructure dữ liệu
        const {
            specialPrize,
            firstPrize,
            secondPrize = [],
            threePrizes = [],
            fourPrizes = [],
            fivePrizes = [],
            sixPrizes = [],
            sevenPrizes = []
        } = data;

        // ✅ Tối ưu: Sử dụng Set để loại bỏ duplicate ngay từ đầu, nhóm theo đuôi luôn
        const lotoDuoiMap = new Map(); // Map<đuôi, Set<số>>

        // Helper function để thêm số vào map
        const addNumber = (num) => {
            if (!num) return;
            const lastTwo = getLastTwoDigits(num);
            if (!lastTwo) return;
            
            const tail = lastTwo[1]; // Số đuôi
            if (!lotoDuoiMap.has(tail)) {
                lotoDuoiMap.set(tail, new Set());
            }
            lotoDuoiMap.get(tail).add(lastTwo);
        };

        // Thu thập tất cả các số từ các giải
        if (specialPrize) addNumber(specialPrize);
        if (firstPrize) addNumber(firstPrize);
        secondPrize.forEach(addNumber);
        threePrizes.forEach(addNumber);
        fourPrizes.forEach(addNumber);
        fivePrizes.forEach(addNumber);
        sixPrizes.forEach(addNumber);
        sevenPrizes.forEach(addNumber);

        // Chuyển đổi Map thành object format
        const lotoDuoi = {};
        for (let i = 0; i <= 9; i++) {
            const tail = i.toString();
            if (lotoDuoiMap.has(tail)) {
                const numbers = Array.from(lotoDuoiMap.get(tail))
                    .sort((a, b) => parseInt(a) - parseInt(b));
                if (numbers.length > 0) {
                    lotoDuoi[tail] = numbers.join(', ');
                }
            }
        }

        return lotoDuoi;
    }, [data]);

    // Loading state - hiển thị khi đang loading và chưa có data
    if (loading && showLoading && !data) {
        return (
            <div className={`${styles.container} ${className}`}>
                <div className={styles.loadingMessage}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải dữ liệu kết quả xổ số...</p>
                </div>
            </div>
        );
    }

    // Error state - chỉ khi có lỗi và không có data
    if (error && showError && !data) {
        return (
            <div className={`${styles.container} ${className}`}>
                <div className={styles.errorMessage}>
                    <h3>Lỗi tải dữ liệu</h3>
                    <p>{error}</p>
                    <button
                        className={styles.retryButton}
                        onClick={refetch}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    // Nếu không có data, không hiển thị gì (hoặc loading nếu showLoading = true)
    if (!data) {
        if (showLoading) {
            return (
                <div className={`${styles.container} ${className}`}>
                    <div className={styles.loadingMessage}>
                        <div className={styles.spinner}></div>
                        <p>Đang tải dữ liệu kết quả xổ số...</p>
                    </div>
                </div>
            );
        }
        return null;
    }

    // Destructure dữ liệu
    const {
        date: resultDate,
        specialPrize,
        firstPrize,
        secondPrize = [],
        threePrizes = [],
        fourPrizes = [],
        fivePrizes = [],
        sixPrizes = [],
        sevenPrizes = [],
        maDB = '',
        loto = {}
    } = data;

    // Debug log - tạm thời tắt để tránh spam console
    // console.log('🔍 XSMBSimpleTable rendering with data:', data);

    return (
        <div className={`${styles.container} ${className}`}>

            <div className={styles.horizontalLayout}>
                <div className={styles.mainTableContainer}>
                    {/* Main Results Table */}
                    <table className={styles.ketqua} cellSpacing="1" cellPadding="9">
                        <thead>
                            <tr>
                                <th colSpan="13" className={styles.kqcell + ' ' + styles.kq_ngay}>
                                    {formattedDate}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Giải đặc biệt */}
                            {specialPrize && (
                                <tr>
                                    <td className={styles.leftcol}>ĐB</td>
                                    <td colSpan="12" className={styles.kqcell + ' ' + styles.kq_0}>
                                        {specialPrize}
                                    </td>
                                </tr>
                            )}

                            {/* Giải nhất */}
                            {firstPrize && (
                                <tr>
                                    <td className={styles.leftcol}>1</td>
                                    <td colSpan="12" className={styles.kqcell + ' ' + styles.kq_1}>
                                        {firstPrize}
                                    </td>
                                </tr>
                            )}

                            {/* Giải nhì */}
                            {secondPrize.length > 0 && (
                                <tr>
                                    <td className={styles.leftcol}>2</td>
                                    {secondPrize.map((number, index) => (
                                        <td key={index} colSpan={12 / secondPrize.length} className={styles.kqcell + ' ' + styles[`kq_${index + 2}`]}>
                                            {number}
                                        </td>
                                    ))}
                                </tr>
                            )}

                            {/* Giải ba */}
                            {threePrizes.length > 0 && (
                                <>
                                    <tr>
                                        <td rowSpan="2" className={styles.leftcol}>3</td>
                                        {threePrizes.slice(0, 3).map((number, index) => (
                                            <td key={index} colSpan="4" className={styles.kqcell + ' ' + styles[`kq_${index + 4}`]}>
                                                {number}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        {threePrizes.slice(3, 6).map((number, index) => (
                                            <td key={index} colSpan="4" className={styles.kqcell + ' ' + styles[`kq_${index + 7}`]}>
                                                {number}
                                            </td>
                                        ))}
                                    </tr>
                                </>
                            )}

                            {/* Giải tư */}
                            {fourPrizes.length > 0 && (
                                <tr>
                                    <td className={styles.leftcol}>4</td>
                                    {fourPrizes.map((number, index) => (
                                        <td key={index} colSpan="3" className={styles.kqcell + ' ' + styles[`kq_${index + 10}`]}>
                                            {number}
                                        </td>
                                    ))}
                                </tr>
                            )}

                            {/* Giải năm */}
                            {fivePrizes.length > 0 && (
                                <>
                                    <tr>
                                        <td rowSpan="2" className={styles.leftcol}>5</td>
                                        {fivePrizes.slice(0, 3).map((number, index) => (
                                            <td key={index} colSpan="4" className={styles.kqcell + ' ' + styles[`kq_${index + 14}`]}>
                                                {number}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        {fivePrizes.slice(3, 6).map((number, index) => (
                                            <td key={index} colSpan="4" className={styles.kqcell + ' ' + styles[`kq_${index + 17}`]}>
                                                {number}
                                            </td>
                                        ))}
                                    </tr>
                                </>
                            )}

                            {/* Giải sáu */}
                            {sixPrizes.length > 0 && (
                                <tr>
                                    <td className={styles.leftcol}>6</td>
                                    {sixPrizes.map((number, index) => (
                                        <td key={index} colSpan="4" className={styles.kqcell + ' ' + styles[`kq_${index + 20}`]}>
                                            {number}
                                        </td>
                                    ))}
                                </tr>
                            )}

                            {/* Giải bảy */}
                            {sevenPrizes.length > 0 && (
                                <tr>
                                    <td className={styles.leftcol}>7</td>
                                    {sevenPrizes.map((number, index) => (
                                        <td key={index} colSpan="3" className={styles.kqcell + ' ' + styles[`kq_${index + 23}`]}>
                                            {number}
                                        </td>
                                    ))}
                                </tr>
                            )}

                            {/* Mã đặc biệt */}
                            {maDB && (
                                <tr>
                                    <td className={styles.leftcol}>ĐB</td>
                                    <td colSpan="12" className={styles.kqcell + ' ' + styles.kq_maDB}>
                                        {maDB}
                                    </td>
                                </tr>
                            )}

                            <tr className={styles.lastrow}>
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.sideTablesContainer}>
                    {/* Loto Đầu Table */}
                    <table className={styles.dau} cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', tableLayout: 'auto' }}>
                        <tbody>
                            <tr>
                                <th>Đầu</th>
                                <th>&nbsp;</th>
                            </tr>
                            {/* ✅ Tối ưu: Sử dụng Array.from với length cố định thay vì Object.entries để tránh re-sort */}
                            {Array.from({ length: 10 }, (_, i) => i.toString()).map((digit) => {
                                const numbers = loto[digit];
                                if (!numbers) return null;
                                return (
                                    <tr key={digit}>
                                        <td className={styles.dauDigitCol}>
                                            {digit}
                                        </td>
                                        <td className={styles[`dau_${digit}`] + ' ' + styles.dauDataCol}>
                                            {numbers}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Loto Đuôi Table */}
                    <table className={styles.dit} cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', tableLayout: 'auto' }}>
                        <tbody>
                            <tr>
                                <th>Đuôi</th>
                                <th>&nbsp;</th>
                            </tr>
                            {/* ✅ Tối ưu: Sử dụng Array.from với length cố định thay vì Object.entries để tránh re-sort */}
                            {Array.from({ length: 10 }, (_, i) => i.toString()).map((digit) => {
                                const numbers = calculateLotoDuoi[digit];
                                if (!numbers) return null;
                                return (
                                    <tr key={digit}>
                                        <td className={styles.ditDigitCol}>
                                            {digit}
                                        </td>
                                        <td className={styles[`dit_${digit}`] + ' ' + styles.ditDataCol}>
                                            {numbers}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default XSMBSimpleTable;

/**
 * HƯỚNG DẪN SỬ DỤNG:
 * 
 * 1. Import component:
 *    import XSMBSimpleTable from '../components/XSMBSimpleTable';
 * 
 * 2. Sử dụng với dữ liệu từ API (khuyến nghị):
 *    // Lấy dữ liệu mới nhất
 *    <XSMBSimpleTable />
 *    
 *    // Lấy dữ liệu theo ngày cụ thể
 *    <XSMBSimpleTable date="12-10-2025" />
 *    
 *    // Lấy dữ liệu hôm nay với auto refresh
 *    <XSMBSimpleTable 
 *        useToday={true}
 *        refreshInterval={300000} // 5 phút
 *    />
 *    
 *    // Tùy chỉnh hiển thị
 *    <XSMBSimpleTable 
 *        showLoto={true}
 *        showLoading={true}
 *        showError={true}
 *        className="custom-class"
 *        onDataLoad={(data) => console.log('Data loaded:', data)}
 *        onError={(error) => console.error('Error:', error)}
 *    />
 * 
 * 3. Sử dụng với dữ liệu tĩnh:
 *    const xsmbData = {
 *        date: "12/10/2025",
 *        specialPrize: "26352",
 *        firstPrize: "46620",
 *        secondPrize: ["88046", "06757"],
 *        threePrizes: ["39550", "70090", "41050", "80771", "34896", "86195"],
 *        fourPrizes: ["1305", "1952", "9864", "1984"],
 *        fivePrizes: ["7522", "5300", "6671", "0408", "1568", "7407"],
 *        sixPrizes: ["314", "489", "496"],
 *        sevenPrizes: ["59", "97", "74", "61"],
 *        maDB: "12PD-14PD-3PD-17PD-18PD-8PD-10PD-11PD",
 *        loto: {
 *            "0": "02, 07, 05, 02, 02, 02",
 *            "1": "12",
 *            "2": "20, 28",
 *            "3": "36, 32",
 *            "4": "46, 46, 44, 46, 45, 42",
 *            "5": "52, 57, 54",
 *            "6": "66, 62, 66",
 *            "7": "73",
 *            "8": "81",
 *            "9": "93, 90"
 *        }
 *    };
 *    
 *    <XSMBSimpleTable 
 *        data={xsmbData}
 *        autoFetch={false}
 *        showLoto={true}
 *    />
 * 
 * 4. Các props chính:
 *    - data: Dữ liệu tĩnh (optional)
 *    - date: Ngày cụ thể (DD-MM-YYYY) hoặc 'latest'
 *    - useToday: Sử dụng dữ liệu hôm nay
 *    - autoFetch: Tự động fetch dữ liệu
 *    - refreshInterval: Interval refresh (ms)
 *    - showLoto: Hiển thị bảng loto
 *    - showLoading: Hiển thị loading state
 *    - showError: Hiển thị error state
 *    - onDataLoad: Callback khi load dữ liệu
 *    - onError: Callback khi có lỗi
 * 
 * 5. Cấu hình API:
 *    Thêm vào .env.local:
 *    NEXT_PUBLIC_API_URL=http://localhost:5000
 */