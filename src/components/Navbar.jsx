import React, { useState, useEffect, useRef } from 'react';
import '../global.css';
import styles from './styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Navbar = ({ theme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('hamburger-menu')
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className={`${styles.navbarParent} ${theme}`}>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className={`${styles.hamburgerMenu} ${dropdownOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
        <nav id="myDropdown" className={`${styles.dropdownContent} ${dropdownOpen ? 'show' : ''}`}>
          <div className={styles.dropdownItem}>
            <Link to={ROUTES.HOME}>HOME</Link>
          </div>
          <div className={styles.dropdownItem}>
            <Link to={ROUTES.ABOUT}>ABOUT</Link>
          </div>
          <div className={styles.dropdownItem}>
            <Link to={ROUTES.WORKS.ROOT}>WORKS</Link>
          </div>
          <div className={styles.dropdownItem}>
            <Link to={ROUTES.ARCHIVE.ROOT}>ARCHIVE</Link>
          </div>
          <div className={styles.dropdownItem}>
            <a href="https://filmbyko.cargo.site" target="_blank" rel="noopener noreferrer">PHOTOGRAPHY</a>
          </div>
        </nav>
      </div>

      <nav className={styles.navbar}>
        <ul>
          <li><Link to={ROUTES.ABOUT}>ABOUT</Link></li>
          <li><Link to={ROUTES.WORKS.ROOT}>WORKS</Link></li>
          <li><Link to={ROUTES.ARCHIVE.ROOT}>ARCHIVE</Link></li>
          <li>
            <a href="https://filmbyko.cargo.site/" target="_blank" rel="noopener noreferrer">
              PHOTOGRAPHY
            </a>
          </li>
        </ul>
        <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img 
            src={theme === 'dark' ? '/favicon-white.webp' : '/favicon.webp'} 
            alt="Logo" 
          />
        </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;