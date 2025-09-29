import React from "react";
import "./styles/footer.css";

const Footer = ({ theme }) => {
  return (
    <footer className={`footer ${theme}`}>
      <p>eko03@risd.edu © 2025 Eric Ko</p>
    </footer>
  );
};

export default Footer;