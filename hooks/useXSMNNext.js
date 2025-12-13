/**
 * useXSMNNext Hook
 * Custom hook để quản lý việc fetch dữ liệu XSMN từ backend
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to fetch latest XSMN results with pagination
 * @param {Object} options - Options object
 * @param {boolean} options.autoFetch - Auto fetch on mount
 * @param {number} options.refreshInterval - Refresh interval in ms
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Number of days per page (default: 10), not number of documents
 */
export function useXSMNLatest10(options = {}) {
    const { autoFetch = true, refreshInterval = 0, page = 1, limit = 10 } = options;
    
    // ✅ Cache key for this specific page/limit combination
    const cacheKey = `xsmn_latest10_${page}_${limit}`;
    
    const getCachedData = () => {
        if (typeof window === 'undefined') return null;
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const { data: cachedData, pagination: cachedPagination, timestamp } = JSON.parse(cached);
                // Cache trong 2 phút
                if (Date.now() - timestamp < 2 * 60 * 1000) {
                    return { data: cachedData, pagination: cachedPagination };
                }
            }
        } catch (e) {
            // Silent error
        }
        return null;
    };

    const setCachedData = (dataToCache, paginationToCache) => {
        if (typeof window === 'undefined') return;
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({
                data: dataToCache,
                pagination: paginationToCache,
                timestamp: Date.now()
            }));
        } catch (e) {
            // Silent error
        }
    };

    // ✅ Initialize with cached data if available
    const cached = getCachedData();
    const [data, setData] = useState(cached?.data || null);
    const [pagination, setPagination] = useState(cached?.pagination || null);
    const [loading, setLoading] = useState(!cached);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const url = `${apiUrl}/api/xsmn/results/latest10?page=${page}&limit=${limit}`;
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && result.data) {
                if (Array.isArray(result.data) && result.data.length > 0) {
                    setData(result.data);
                    setPagination(result.pagination);
                    // ✅ Cache the result
                    setCachedData(result.data, result.pagination);
                } else {
                    setData([]);
                    setPagination(result.pagination || { currentPage: 1, totalPages: 1 });
                    setCachedData([], result.pagination || { currentPage: 1, totalPages: 1 });
                }
            } else {
                throw new Error(result.message || 'Invalid response format');
            }
        } catch (err) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [page, limit, cacheKey]);

    // Auto fetch on mount and when page/limit changes
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData]);

    // Set up refresh interval
    useEffect(() => {
        if (refreshInterval > 0) {
            const interval = setInterval(() => fetchData(), refreshInterval);
            return () => clearInterval(interval);
        }
    }, [refreshInterval, fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, pagination, loading, error, refetch };
}

// Export default object với tất cả hooks
export default {
    useXSMNLatest10
};

