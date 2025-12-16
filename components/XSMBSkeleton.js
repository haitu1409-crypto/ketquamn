/**
 * XSMBSkeleton Component
 * Skeleton loader giống layout thật để reserve space và cải thiện LCP
 */

import React from 'react';
import styles from '../styles/XSMBSimpleTable.module.css';

const XSMBSkeleton = () => {
    return (
        <div className={`${styles.container} ${styles.skeleton}`}>
            <div className={styles.horizontalLayout}>
                <div className={styles.mainTableContainer}>
                    {/* Main Results Table Skeleton */}
                    <table className={styles.ketqua} cellSpacing="1" cellPadding="9">
                        <thead>
                            <tr>
                                <th colSpan="13" className={styles.kqcell + ' ' + styles.kq_ngay}>
                                    <div className={styles.skeletonText} style={{ width: '200px', height: '20px', margin: '0 auto' }}></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Giải đặc biệt skeleton */}
                            <tr>
                                <td className={styles.leftcol}>ĐB</td>
                                <td colSpan="12" className={styles.kqcell + ' ' + styles.kq_0}>
                                    <div className={styles.skeletonText} style={{ width: '80px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải nhất skeleton */}
                            <tr>
                                <td className={styles.leftcol}>1</td>
                                <td colSpan="12" className={styles.kqcell + ' ' + styles.kq_1}>
                                    <div className={styles.skeletonText} style={{ width: '80px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải nhì skeleton */}
                            <tr>
                                <td className={styles.leftcol}>2</td>
                                <td colSpan="6" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '80px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="6" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '80px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải ba skeleton */}
                            <tr>
                                <td rowSpan="2" className={styles.leftcol}>3</td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '60px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '60px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '60px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '60px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '60px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '60px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải tư skeleton */}
                            <tr>
                                <td className={styles.leftcol}>4</td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải năm skeleton */}
                            <tr>
                                <td rowSpan="2" className={styles.leftcol}>5</td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '50px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải sáu skeleton */}
                            <tr>
                                <td className={styles.leftcol}>6</td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '40px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '40px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="4" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '40px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Giải bảy skeleton */}
                            <tr>
                                <td className={styles.leftcol}>7</td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '30px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '30px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '30px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                                <td colSpan="3" className={styles.kqcell}>
                                    <div className={styles.skeletonText} style={{ width: '30px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            {/* Mã đặc biệt skeleton - LCP element */}
                            <tr>
                                <td className={styles.leftcol}>ĐB</td>
                                <td colSpan="12" className={styles.kqcell + ' ' + styles.kq_maDB}>
                                    <div className={styles.skeletonText} style={{ width: '300px', height: '24px', margin: '0 auto' }}></div>
                                </td>
                            </tr>

                            <tr className={styles.lastrow}>
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.sideTablesContainer}>
                    {/* Loto Đầu Table Skeleton */}
                    <table className={styles.dau} cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', tableLayout: 'auto' }}>
                        <tbody>
                            <tr>
                                <th>Đầu</th>
                                <th>&nbsp;</th>
                            </tr>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                                <tr key={digit}>
                                    <td className={styles.dauDigitCol}>
                                        {digit}
                                    </td>
                                    <td className={styles.dauDataCol}>
                                        <div className={styles.skeletonText} style={{ width: '80px', height: '18px', margin: '0 auto' }}></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Loto Đuôi Table Skeleton */}
                    <table className={styles.dit} cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', tableLayout: 'auto' }}>
                        <tbody>
                            <tr>
                                <th>Đuôi</th>
                                <th>&nbsp;</th>
                            </tr>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                                <tr key={digit}>
                                    <td className={styles.ditDigitCol}>
                                        {digit}
                                    </td>
                                    <td className={styles.ditDataCol}>
                                        <div className={styles.skeletonText} style={{ width: '80px', height: '18px', margin: '0 auto' }}></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default XSMBSkeleton;

