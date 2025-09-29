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

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`back-to-top ${theme} ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            BACK TO TOP ↑
        </div>
    );
}