/**
 * Component hiển thị danh sách kết quả XSMN với phân trang
 * Hỗ trợ nhiều tỉnh mỗi ngày (3-4 tỉnh)
 * Có giải 8, không có maDB
 * Bố cục giống dự án kqxs
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of days per page (default: 10), not number of documents
 * @param {Function} onPaginationChange - Callback when pagination changes
 */

import React, { useState, useMemo, useCallback } from 'react';
import styles from '../styles/XSMNSimpleTable.module.css';
import { useXSMNLatest10 } from '../hooks/useXSMNNext';
import { getFilteredNumber } from '../utils/lotteryUtils';

const XSMNLatest10Table = ({ page = 1, limit = 10, onPaginationChange }) => {
    const [displayedDaysCount, setDisplayedDaysCount] = useState(3); // Số ngày hiển thị, không phải số documents
    const [filterTypes, setFilterTypes] = useState({});
    const { data: apiData, pagination, loading, error } = useXSMNLatest10({ page, limit });

    // Notify parent component of pagination changes
    React.useEffect(() => {
        if (pagination && onPaginationChange) {
            onPaginationChange(pagination);
        }
    }, [pagination, onPaginationChange]);

    // Use API data if available, otherwise show empty state
    const data = apiData;

    // ✅ Removed debug logs for production performance

    // Function to format date
    const formatDate = (dateInput) => {
        if (!dateInput) return '';
        try {
            const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
            if (isNaN(date.getTime())) {
                return '';
            }
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (error) {
            // Silent error handling for production
            return '';
        }
    };

    // Function to get day of week
    const getDayOfWeek = (dateInput) => {
        if (!dateInput) return '';
        try {
            const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
            if (isNaN(date.getTime())) {
                return '';
            }
            const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
            return days[date.getDay()];
        } catch (error) {
            // Silent error handling for production
            return '';
        }
    };

    // Function to get head and tail numbers for statistics
    const getHeadAndTailNumbers = useCallback((result) => {
        const allNumbers = [
            ...(result.eightPrizes || []).map(num => ({ num, isEighth: true })),
            ...(result.specialPrize || []).map(num => ({ num, isSpecial: true })),
            ...(result.firstPrize || []).map(num => ({ num })),
            ...(result.secondPrize || []).map(num => ({ num })),
            ...(result.threePrizes || []).map(num => ({ num })),
            ...(result.fourPrizes || []).map(num => ({ num })),
            ...(result.fivePrizes || []).map(num => ({ num })),
            ...(result.sixPrizes || []).map(num => ({ num })),
            ...(result.sevenPrizes || []).map(num => ({ num })),
        ]
            .filter(item => item.num != null && item.num !== '')
            .map((item) => {
                const numStr = String(item.num).padStart(2, '0');
                const last2 = numStr.slice(-2);
                return {
                    num: last2,
                    isEighth: item.isEighth || false,
                    isSpecial: item.isSpecial || false,
                };
            })
            .filter(item => item.num != null && item.num !== '' && !isNaN(item.num));

        const heads = Array(10).fill().map(() => []);
        const tails = Array(10).fill().map(() => []);

        allNumbers.forEach((item) => {
            if (item.num != null && item.num !== '') {
                const numStr = String(item.num).padStart(2, '0');
                const head = parseInt(numStr[0]);
                const tail = parseInt(numStr[numStr.length - 1]);

                if (!isNaN(head) && head >= 0 && head <= 9 && !isNaN(tail) && tail >= 0 && tail <= 9) {
                    heads[head].push({ num: numStr, isEighth: item.isEighth, isSpecial: item.isSpecial });
                    tails[tail].push({ num: numStr, isEighth: item.isEighth, isSpecial: item.isSpecial });
                }
            }
        });

        for (let i = 0; i < 10; i++) {
            heads[i].sort((a, b) => parseInt(a.num) - parseInt(b.num));
            tails[i].sort((a, b) => parseInt(a.num) - parseInt(b.num));
        }

        return { heads, tails };
    }, []);

    // Handle filter change
    const handleFilterChange = useCallback((dateKey, value) => {
        setFilterTypes((prev) => ({
            ...prev,
            [dateKey]: value,
        }));
    }, []);

    // Helper function to normalize date (remove time component)
    // Use a string-based approach to ensure same day = same key regardless of time/timezone
    const getDateKey = (dateInput) => {
        if (!dateInput) return null;
        try {
            const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
            if (isNaN(date.getTime())) {
                return null;
            }
            // Get year, month, day as numbers (local timezone)
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // getMonth() returns 0-11
            const day = date.getDate();
            // Return as YYYY-MM-DD string for consistent grouping
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        } catch (error) {
            // Silent error handling for production
            return null;
        }
    };

    // Helper function to convert YYYY-MM-DD to DD/MM/YYYY
    const formatDateKey = (dateKeyRaw) => {
        if (!dateKeyRaw) return null;
        const parts = dateKeyRaw.split('-');
        if (parts.length !== 3) return null;
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    // Group ALL results by date first (using date key for consistent grouping)
    const allGroupedByDate = (data || []).reduce((acc, result) => {
        if (!result || !result.drawDate) {
            return acc;
        }
        // Get date key (YYYY-MM-DD format)
        const dateKeyRaw = getDateKey(result.drawDate);
        if (!dateKeyRaw) {
            return acc;
        }
        // Format to DD/MM/YYYY for display
        const dateKey = formatDateKey(dateKeyRaw);
        if (!dateKey) {
            return acc;
        }
        
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(result);
        return acc;
    }, {});

    // Get sorted date keys (newest first)
    const sortedDateKeys = Object.keys(allGroupedByDate).sort((a, b) => {
        // Convert DD/MM/YYYY back to Date for sorting
        const dateA = a.split('/').reverse().join('-');
        const dateB = b.split('/').reverse().join('-');
        return new Date(dateB) - new Date(dateA);
    });

    // Slice to get only displayed days
    const displayedDateKeys = sortedDateKeys.slice(0, displayedDaysCount);
    
    // Create displayed grouped data
    const groupedByDate = {};
    displayedDateKeys.forEach(dateKey => {
        groupedByDate[dateKey] = allGroupedByDate[dateKey];
    });
    
    // ✅ Removed debug logs for production performance

    // Handle load more button - tăng số ngày, không phải số documents
    const handleLoadMore = () => {
        setDisplayedDaysCount(prev => Math.min(prev + 3, sortedDateKeys.length));
    };

    // Initialize filter types
    React.useEffect(() => {
        const newFilterTypes = {};
        Object.keys(groupedByDate).forEach(dateKey => {
            if (!filterTypes[dateKey]) {
                newFilterTypes[dateKey] = 'all';
            }
        });
        if (Object.keys(newFilterTypes).length > 0) {
            setFilterTypes(prev => ({ ...prev, ...newFilterTypes }));
        }
    }, [groupedByDate]);

    // Loading state
    if (loading) {
        return (
            <div className={styles.containerKQ}>
                <div className={styles.skeletonContainer}>
                    {[1, 2, 3].map((idx) => (
                        <div key={idx} className={styles.skeletonTable}>
                            <div className={styles.skeletonHeader}></div>
                            <div className={styles.skeletonRow}></div>
                            <div className={styles.skeletonRow}></div>
                            <div className={styles.skeletonRow}></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={styles.containerKQ}>
                <div className={styles.errorMessage}>
                    <h3>Lỗi tải dữ liệu</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // No data state
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className={styles.containerKQ}>
                <div className={styles.errorMessage}>
                    <h3>Chưa có dữ liệu</h3>
                    <p>Hiện tại chưa có kết quả XSMN nào trong hệ thống. Vui lòng thử lại sau.</p>
                </div>
            </div>
        );
    }

    // Check if we have grouped data
    const hasGroupedData = Object.keys(groupedByDate).length > 0;

    if (!hasGroupedData && !loading && !error) {
        return (
            <div className={styles.containerKQ}>
                <div className={styles.errorMessage}>
                    <h3>Chưa có dữ liệu</h3>
                    <p>Hiện tại chưa có kết quả XSMN nào trong hệ thống. Vui lòng thử lại sau.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.containerKQ}>
            {Object.entries(groupedByDate).map(([dateKey, results]) => {
                if (!results || results.length === 0) return null;
                const firstResult = results[0];
                if (!firstResult || !firstResult.drawDate) return null;
                
                const formattedDate = dateKey;
                const dayOfWeek = getDayOfWeek(firstResult.drawDate);
                const currentFilter = filterTypes[dateKey] || 'all';

                // Calculate head and tail statistics
                const allHeads = Array(10).fill().map(() => []);
                const allTails = Array(10).fill().map(() => []);
                const stationsData = results.map(result => {
                    const { heads, tails } = getHeadAndTailNumbers(result);
                    for (let i = 0; i < 10; i++) {
                        allHeads[i].push(heads[i]);
                        allTails[i].push(tails[i]);
                    }
                    return { tentinh: result.tentinh, tinh: result.tinh };
                });

                return (
                    <div key={dateKey} className={styles.kqxs}>
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerTop}>
                                <h1 className={styles.kqxs__title}>
                                    XSMN - Kết quả Xổ số Miền Nam - SXMN {formattedDate}
                                </h1>
                            </div>
                            <div className={styles.kqxs__action}>
                                <a className={styles.kqxs__actionLink} href="#!">XSMN</a>
                                <a className={`${styles.kqxs__actionLink} ${styles.dayOfWeek}`} href="#!">{dayOfWeek}</a>
                                <a className={styles.kqxs__actionLink} href="#!">{formattedDate}</a>
                            </div>
                        </div>

                        {/* Horizontal Layout: Main Table + Statistics Tables */}
                        <div className={styles.horizontalLayout}>
                            {/* Main Results Table Container */}
                            <div className={styles.mainTableContainer}>
                                {/* Main Table */}
                                <table className={styles.tableXS} style={{ '--num-columns': results.length }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {results.map(result => (
                                                <th key={result._id || result.tinh} className={styles.stationName}>
                                                    {result.tentinh}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                {/* Giải 8 */}
                                <tr>
                                    <td className={`${styles.tdTitle} ${styles.highlight}`}>G8</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            <span className={`${styles.prizeNumber} ${styles.highlight}`}>
                                                {result.eightPrizes && result.eightPrizes.length > 0 
                                                    ? getFilteredNumber(result.eightPrizes[0], currentFilter) 
                                                    : '-'}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 7 */}
                                <tr>
                                    <td className={styles.tdTitle}>G7</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            <span className={styles.prizeNumber}>
                                                {result.sevenPrizes && result.sevenPrizes.length > 0 
                                                    ? getFilteredNumber(result.sevenPrizes[0], currentFilter) 
                                                    : '-'}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 6 */}
                                <tr>
                                    <td className={styles.tdTitle}>G6</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            {(result.sixPrizes || []).slice(0, 3).map((kq, idx) => (
                                                <span key={idx} className={styles.prizeNumber}>
                                                    {getFilteredNumber(kq, currentFilter)}
                                                    {idx < (result.sixPrizes || []).slice(0, 3).length - 1 && <br />}
                                                </span>
                                            ))}
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 5 */}
                                <tr>
                                    <td className={`${styles.tdTitle} ${styles.g3}`}>G5</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            {(result.fivePrizes || []).slice(0, 3).map((kq, idx) => (
                                                <span key={idx} className={`${styles.prizeNumber} ${styles.g3}`}>
                                                    {getFilteredNumber(kq, currentFilter)}
                                                    {idx < (result.fivePrizes || []).slice(0, 3).length - 1 && <br />}
                                                </span>
                                            ))}
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 4 */}
                                <tr>
                                    <td className={styles.tdTitle}>G4</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            {(result.fourPrizes || []).slice(0, 7).map((kq, idx) => (
                                                <span key={idx} className={styles.prizeNumber}>
                                                    {getFilteredNumber(kq, currentFilter)}
                                                    {idx < (result.fourPrizes || []).slice(0, 7).length - 1 && <br />}
                                                </span>
                                            ))}
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 3 */}
                                <tr>
                                    <td className={`${styles.tdTitle} ${styles.g3}`}>G3</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            {(result.threePrizes || []).slice(0, 2).map((kq, idx) => (
                                                <span key={idx} className={`${styles.prizeNumber} ${styles.g3}`}>
                                                    {getFilteredNumber(kq, currentFilter)}
                                                    {idx < (result.threePrizes || []).slice(0, 2).length - 1 && <br />}
                                                </span>
                                            ))}
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 2 */}
                                <tr>
                                    <td className={styles.tdTitle}>G2</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            <span className={styles.prizeNumber}>
                                                {result.secondPrize && result.secondPrize.length > 0 
                                                    ? getFilteredNumber(result.secondPrize[0], currentFilter) 
                                                    : '-'}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải 1 */}
                                <tr>
                                    <td className={styles.tdTitle}>G1</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            <span className={styles.prizeNumber}>
                                                {result.firstPrize && result.firstPrize.length > 0 
                                                    ? getFilteredNumber(result.firstPrize[0], currentFilter) 
                                                    : '-'}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Giải Đặc Biệt */}
                                <tr>
                                    <td className={`${styles.tdTitle} ${styles.highlight}`}>ĐB</td>
                                    {results.map(result => (
                                        <td key={result._id || result.tinh} className={styles.rowXS}>
                                            <span className={`${styles.prizeNumber} ${styles.highlight} ${styles.gdb}`}>
                                                {result.specialPrize && result.specialPrize.length > 0 
                                                    ? getFilteredNumber(result.specialPrize[0], currentFilter) 
                                                    : '-'}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Statistics Tables Container (Đầu và Đuôi) */}
                            <div className={styles.sideTablesContainer}>
                                {/* Đầu Table */}
                                <table className={styles.dau}>
                                    <tbody>
                                        <tr>
                                            <th>Đầu</th>
                                            {stationsData.map(station => (
                                                <th key={station.tinh} className={styles.dauDataCol}>
                                                    {station.tentinh}
                                                </th>
                                            ))}
                                        </tr>
                                        {Array.from({ length: 10 }, (_, idx) => (
                                            <tr key={idx}>
                                                <td className={styles.dauDigitCol}>{idx}</td>
                                                {allHeads[idx].map((headNumbers, stationIdx) => (
                                                    <td key={stationIdx} className={`${styles[`dau_${idx}`]} ${styles.dauDataCol}`}>
                                                        {headNumbers && headNumbers.length > 0 ? (
                                                            headNumbers.map((item, numIdx) => (
                                                                <span
                                                                    key={numIdx}
                                                                    className={
                                                                        item.isEighth || item.isSpecial
                                                                            ? styles.highlightPrize
                                                                            : ''
                                                                    }
                                                                >
                                                                    {item.num}
                                                                    {numIdx < headNumbers.length - 1 && ', '}
                                                                </span>
                                                            ))
                                                        ) : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Đuôi Table */}
                                <table className={styles.dit}>
                                    <tbody>
                                        <tr>
                                            <th>Đuôi</th>
                                            {stationsData.map(station => (
                                                <th key={station.tinh} className={styles.ditDataCol}>
                                                    {station.tentinh}
                                                </th>
                                            ))}
                                        </tr>
                                        {Array.from({ length: 10 }, (_, idx) => (
                                            <tr key={idx}>
                                                <td className={styles.ditDigitCol}>{idx}</td>
                                                {allTails[idx].map((tailNumbers, stationIdx) => (
                                                    <td key={stationIdx} className={`${styles[`dit_${idx}`]} ${styles.ditDataCol}`}>
                                                        {tailNumbers && tailNumbers.length > 0 ? (
                                                            tailNumbers.map((item, numIdx) => (
                                                                <span
                                                                    key={numIdx}
                                                                    className={
                                                                        item.isEighth || item.isSpecial
                                                                            ? styles.highlightPrize
                                                                            : ''
                                                                    }
                                                                >
                                                                    {item.num}
                                                                    {numIdx < tailNumbers.length - 1 && ', '}
                                                                </span>
                                                            ))
                                                        ) : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Load More Button */}
            {displayedDaysCount < sortedDateKeys.length && (
                <div className={styles.loadMoreContainer}>
                    <button
                        onClick={handleLoadMore}
                        className={styles.loadMoreButton}
                    >
                        Xem thêm 3 ngày ({displayedDaysCount + 3 <= sortedDateKeys.length ? 3 : sortedDateKeys.length - displayedDaysCount} ngày)
                    </button>
                </div>
            )}

            {/* Show all loaded message */}
            {displayedDaysCount >= sortedDateKeys.length && sortedDateKeys.length > 3 && (
                <div className={styles.allLoadedMessage}>
                    Đã hiển thị tất cả {sortedDateKeys.length} ngày
                </div>
            )}
        </div>
    );
};

export default XSMNLatest10Table;
