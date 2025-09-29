import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import './styles/back-to-top.css';

export default function BackToTop({ theme }) {
    const [isVisible, setIsVisible] = useState(false);

    // Detect if device is mobile (same logic as SmoothScroll)
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top - works with both smooth scroll (desktop) and native scroll (mobile)
    const scrollToTop = () => {
        if (isMobile) {
            // On mobile, use native scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // On desktop with smooth scroll, directly manipulate the scroll position
            // This is the same approach used in the anchor link handler
            window.scrollTo(0, 0);
            
            // Also dispatch a custom event that SmoothScroll can listen to
            const scrollToTopEvent = new CustomEvent('scrollToTop');
            window.dispatchEvent(scrollToTopEvent);
        }
    };

    return (
        <div className={`back-to-top ${theme} ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            BACK TO TOP ↑
        </div>
    );
}