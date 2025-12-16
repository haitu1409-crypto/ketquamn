/**
 * Mobile Navigation Component
 * Tách riêng mobile navigation để dễ quản lý
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDown, Users } from 'lucide-react';
import AuthButton from './Auth/AuthButton';
import styles from '../styles/Layout.module.css';

// Telegram Icon Component
const TelegramIcon = ({ size = 20, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
);

// Facebook Icon Component
const FacebookIcon = ({ size = 20, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const MobileNav = ({
    isOpen,
    navLinks,
    openDropdown,
    setOpenDropdown,
    onClose,
    onLinkClick
}) => {
    const router = useRouter();

    // Reset scroll position when route changes
    useEffect(() => {
        const handleRouteChangeStart = () => {
            // Reset scroll to top immediately when navigation starts
            window.scrollTo({ top: 0, behavior: 'instant' });
        };

        const handleRouteChangeComplete = () => {
            // Ensure scroll is at top when navigation completes (backup)
            window.scrollTo({ top: 0, behavior: 'instant' });
        };

        router.events?.on('routeChangeStart', handleRouteChangeStart);
        router.events?.on('routeChangeComplete', handleRouteChangeComplete);
        
        return () => {
            router.events?.off('routeChangeStart', handleRouteChangeStart);
            router.events?.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router]);

    // Helper function to handle link click
    const handleLinkClick = (e) => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile Overlay - Control visibility with CSS class only */}
            {isOpen && (
                <div
                    className={`${styles.mobileOverlay} ${styles.mobileOverlayOpen}`}
                    onClick={onClose}
                    onTouchStart={onClose}
                    aria-hidden="false"
                    role="button"
                    tabIndex={-1}
                />
            )}

            {/* Mobile Navigation */}
            <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}>
                <div 
                    className={styles.mobileNavContent} 
                    onClick={(e) => {
                        // Don't close menu when clicking inside nav content
                        e.stopPropagation();
                        if (onLinkClick) onLinkClick(e);
                    }}
                >
                    {/* Auth Button - Mobile (top) */}
                    <div className={styles.mobileAuthButton}>
                        <AuthButton variant="mobile" />
                    </div>

                    {navLinks.map((link, index) => {
                        // Handle dropdown menu in mobile
                        if (link.isDropdown) {
                            const IconComponent = link.icon;
                            const isOpen = openDropdown === link.label;
                            return (
                                <div key={`mobile-dropdown-${index}`}>
                                    <div className={styles.mobileDropdownWrapper}>
                                        <div 
                                            className={styles.mobileDropdownHeader}
                                            onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                                        >
                                            <div className={styles.mobileNavLinkContent}>
                                                <div className={styles.mobileNavLinkHeader}>
                                                    <IconComponent size={20} className={styles.mobileNavIcon} />
                                                    <span className={styles.mobileNavLinkLabel}>{link.label}</span>
                                                    <ChevronDown size={16} className={`${styles.mobileDropdownIcon} ${isOpen ? styles.rotate : ''}`} />
                                                </div>
                                            </div>
                                        </div>
                                        {isOpen && (
                                            <div className={styles.mobileDropdownSubmenu}>
                                                {link.submenu.map((subItem, subIndex) => {
                                                    const SubIconComponent = subItem.icon;
                                                    return (
                                                        <Link
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            className={`${styles.mobileNavSubLink} ${router.pathname === subItem.href ? styles.active : ''}`}
                                                            onClick={(e) => {
                                                                if (onClose) onClose();
                                                                setOpenDropdown(null);
                                                            }}
                                                        >
                                                            <SubIconComponent size={18} className={styles.mobileNavSubIcon} />
                                                            <span>{subItem.label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }

                        // Handle regular links
                        const IconComponent = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${styles.mobileNavLink} ${router.pathname === link.href ? styles.active : ''}`}
                                onClick={handleLinkClick}
                                prefetch={false}
                            >
                                <div className={styles.mobileNavLinkContent}>
                                    <div className={styles.mobileNavLinkHeader}>
                                        <IconComponent size={20} className={styles.mobileNavIcon} />
                                        <span className={styles.mobileNavLinkLabel}>{link.label}</span>
                                        {link.isNew && <span className={styles.mobileNewBadge}>NEW</span>}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Social Media Links - Đặt ở cuối cùng */}
                    <div style={{ 
                        marginTop: 'auto', 
                        paddingTop: '20px', 
                        borderTop: '2px solid #e0f2fe',
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                        borderRadius: '12px 12px 0 0',
                        padding: '16px',
                        marginLeft: '-16px',
                        marginRight: '-16px',
                        marginBottom: '-16px'
                    }}>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#0369a1', 
                            marginBottom: '14px', 
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Kết nối với chúng tôi
                        </div>
                        
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            gap: '8px' 
                        }}>
                            {/* Telegram Link */}
                            <a
                                href="https://t.me/+AmYQcrl7stkxZWY1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mobileNavLink}
                                onClick={onClose}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid rgba(0, 136, 204, 0.15)',
                                    borderRadius: '10px',
                                    color: '#1e40af',
                                    fontWeight: '600',
                                    textDecoration: 'none'
                                }}
                            >
                                <TelegramIcon size={20} style={{ color: '#0088cc' }} />
                                <span>Telegram</span>
                            </a>

                            {/* Facebook Link */}
                            <a
                                href="https://www.facebook.com/share/g/1FrkgbX6Sw/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mobileNavLink}
                                onClick={onClose}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid rgba(0, 136, 204, 0.15)',
                                    borderRadius: '10px',
                                    color: '#1e40af',
                                    fontWeight: '600',
                                    textDecoration: 'none'
                                }}
                            >
                                <FacebookIcon size={20} style={{ color: '#0088cc' }} />
                                <span>Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileNav;

