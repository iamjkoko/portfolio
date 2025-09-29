import React, { useState, useEffect } from 'react';
import './styles/back-to-top.css';

export default function BackToTop({ theme }) {
    const [isVisible, setIsVisible] = useState(false);

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

    // Scroll to top smoothly - works with SmoothScroll
    const scrollToTop = () => {
        // Use the same method as SmoothScroll's anchor link handling
        window.scrollTo(0, 0);
    };

    return (
        <div className={`back-to-top ${theme} ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            BACK TO TOP ↑
        </div>
    );
}