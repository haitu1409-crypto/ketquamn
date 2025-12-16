/**
 * HeroActions Component
 * Global navigation bar that sticks to top when scrolling
 * Only visible on mobile devices
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/HeroActions.module.css';

export default function HeroActions() {
    const router = useRouter();
    const [isSticky, setIsSticky] = useState(false);
    const heroActionsRef = useRef(null);
    const initialTopRef = useRef(null);
    const rafIdRef = useRef(null);
    const isStickyRef = useRef(false);
    const isMobileRef = useRef(null);

    // ✅ OPTIMIZED: Only run JavaScript logic on mobile devices to avoid unnecessary work on desktop
    useEffect(() => {
        if (typeof window === 'undefined' || !heroActionsRef.current) return;

        // Check if component is visible (mobile only)
        const checkIfMobile = () => {
            if (isMobileRef.current === null) {
                const styles = window.getComputedStyle(heroActionsRef.current);
                isMobileRef.current = styles.display !== 'none';
            }
            return isMobileRef.current;
        };

        // Early return if not mobile - don't waste resources on desktop
        if (!checkIfMobile()) {
            return;
        }

        // Set initial position once on mount (deferred to avoid blocking initial render)
        const setInitialPosition = () => {
            if (heroActionsRef.current && initialTopRef.current === null) {
                const rect = heroActionsRef.current.getBoundingClientRect();
                initialTopRef.current = rect.top + window.scrollY;
            }
        };

        // Use requestAnimationFrame for smooth, performant updates
        const handleScroll = () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }

            rafIdRef.current = requestAnimationFrame(() => {
                if (!heroActionsRef.current || initialTopRef.current === null) {
                    setInitialPosition();
                    return;
                }

                const scrollY = window.scrollY || window.pageYOffset;
                const shouldBeSticky = scrollY > initialTopRef.current;

                // ✅ OPTIMIZED: Only update state if value actually changed
                if (shouldBeSticky !== isStickyRef.current) {
                    isStickyRef.current = shouldBeSticky;
                    setIsSticky(shouldBeSticky);
                }
            });
        };

        // ✅ OPTIMIZED: Defer initialization to avoid blocking initial page render
        // Use requestIdleCallback if available, otherwise setTimeout with delay
        let initTimer;
        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
                setInitialPosition();
                handleScroll();
            }, { timeout: 500 });
        } else {
            // Fallback: defer to next tick to avoid blocking render
            initTimer = setTimeout(() => {
                setInitialPosition();
                handleScroll();
            }, 0);
        }

        // Throttled resize handler (resize happens less frequently)
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Recalculate if still mobile
                if (checkIfMobile()) {
                    initialTopRef.current = null;
                    setInitialPosition();
                    handleScroll();
                }
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            if (initTimer) {
                clearTimeout(initTimer);
            }
            clearTimeout(resizeTimer);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const links = [
        { href: '/ket-qua-xo-so-mien-bac', label: 'XSMB', title: 'XSMB' },
        { href: '/ket-qua-xo-so-mien-nam', label: 'XSMN', title: 'XSMN' },
        { href: '/dan-9x0x', label: 'Tạo Dàn Đề 9x-0x', title: 'Tạo Dàn Đề 9x-0x' },
        { href: '/loc-dan-de', label: 'Lọc Dàn Đề 9x-0x', title: 'Lọc Dàn Đề 9x-0x' },
        { href: '/dan-2d', label: 'Dàn 2D/1D', title: 'Dàn 2D/1D' },
        { href: '/dan-3d4d', label: 'Dàn 3D/4D', title: 'Dàn 3D/4D' },
        { href: '/ket-qua-xo-so-mien-bac', label: 'Kết Quả Xổ Số', title: 'Kết Quả Xổ Số' },
        { href: '/soi-cau-dac-biet-mien-bac', label: 'Soi Cầu Đặc Biệt', title: 'Soi Cầu Đặc Biệt' },
        { href: '/soi-cau-mien-bac-ai', label: 'Soi Cầu AI', title: 'Soi Cầu AI' },
        { href: '/dan-dac-biet', label: 'Dàn Đặc Biệt', title: 'Dàn Đặc Biệt' },
        { href: '/thongke/lo-gan', label: 'Lô Gan', title: 'Lô Gan' },
        { href: '/thongke/dau-duoi', label: 'Đầu Đuôi', title: 'Đầu Đuôi' },
        { href: '/thongke/giai-dac-biet', label: 'Giải ĐB', title: 'Giải ĐB' },
        { href: '/thongke/giai-dac-biet-tuan', label: 'ĐB Tuần', title: 'ĐB Tuần' },
        { href: '/thongke/tan-suat-loto', label: 'Tần Suất Lô Tô', title: 'Tần Suất Lô Tô' },
        { href: '/thongke/tan-suat-locap', label: 'Tần Suất Lô Cặp', title: 'Tần Suất Lô Cặp' }
    ];

    return (
        <div 
            ref={heroActionsRef}
            className={`${styles.heroActions} ${isSticky ? styles.sticky : ''}`}
        >
            {links.map((link, index) => {
                const isActive = router.pathname === link.href || router.asPath === link.href;
                return (
                    <Link
                        key={`${link.href}-${index}`}
                        href={link.href}
                        className={`${styles.heroActionLink} ${isActive ? styles.active : ''}`}
                        prefetch={false}
                        title={link.title}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
}

