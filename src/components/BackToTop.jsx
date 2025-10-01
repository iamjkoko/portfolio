import React from 'react';
import gsap from 'gsap';
import './styles/back-to-top.css';

export default function BackToTop({ theme }) {
    // Detect if device is mobile (same logic as SmoothScroll)
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const scrollToTop = () => {
        if (isMobile) {
            // Mobile → native smooth scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Desktop → integrate with SmoothScroll
            window.scrollTo(0, 0);

            // Dispatch event so SmoothScroll can handle the animation
            const scrollToTopEvent = new CustomEvent('scrollToTop');
            window.dispatchEvent(scrollToTopEvent);
        }
    };

    return (
        <div className={`back-to-top ${theme}`} onClick={scrollToTop}>
            BACK TO TOP ↑
        </div>
    );
}
