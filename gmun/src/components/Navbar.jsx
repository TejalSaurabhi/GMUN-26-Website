import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gmunlogo from "../images/GMUN Gold.png";
import edition from "../images/4thBackLogo.webp";
import "../styles/Navbar.css";

const Navbar = () => {
  const authStatus = false; // frontend-only: no auth state
  const navigate = useNavigate();
  const location = useLocation();
  
  // Helper to check if a path is active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  // Handle link click - close menu and scroll to top
  const handleLinkClick = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className="glass-capsule">
        
        {/* Logo */}
        <div className="logo-section">
          <Link to="/" onClick={handleLinkClick}>
            <div className="logo-3d-wrapper">
              <img src={gmunlogo} alt="GMUN" className="logo-face front" />
              <img src={edition} alt="3rd" className="logo-face back" />
            </div>
          </Link>
        </div>

        {/* Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><Link to="/" className={`roll-text ${isActive('/') ? 'active' : ''}`} onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/how-to-mun" className={`roll-text ${isActive('/how-to-mun') ? 'active' : ''}`} onClick={handleLinkClick}>How to MUN</Link></li>

          {/* Dropdown for Committees */}
          <li className={`dropdown-trigger ${isDropdownOpen ? 'open' : ''} ${isActive('/committee') ? 'active' : ''}`} onClick={toggleDropdown}>
            <span className={`roll-text ${isActive('/committee') ? 'active' : ''}`}>Committees</span>
            
            <ul className="dropdown-panel">
            <li>
              <Link to="/committee/1" onClick={handleLinkClick}>UNSC</Link>
            </li>
            <li>
              <Link to="/committee/2" onClick={handleLinkClick}>UNHRC</Link>
            </li>
            <li>
              <Link to="/committee/3" onClick={handleLinkClick}>AIPPM</Link>
            </li>
            <li>
              <Link to="/committee/4" onClick={handleLinkClick}>DISEC</Link>
            </li>
            <li>
              <Link to="/committee/5" onClick={handleLinkClick}>International Press</Link>
            </li>
            <li>
              <Link to="/committee/6" onClick={handleLinkClick}>World Bank</Link>
            </li>
            <li>
              <Link to="/committee/7" onClick={handleLinkClick}>UN CSW</Link>
            </li>
            </ul>
          </li>

          <li><Link to="/FAQs" className={`roll-text ${isActive('/FAQs') ? 'active' : ''}`} onClick={handleLinkClick}>FAQs</Link></li>
          <li><Link to="/gallery" className={`roll-text ${isActive('/gallery') ? 'active' : ''}`} onClick={handleLinkClick}>Gallery</Link></li>
          <li><Link to="/sec" className={`roll-text ${isActive('/sec') ? 'active' : ''}`} onClick={handleLinkClick}>Secretariat</Link></li>
          <li><Link to="/AboutUs" className={`roll-text ${isActive('/AboutUs') ? 'active' : ''}`} onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/Sponsors" className={`roll-text ${isActive('/Sponsors') ? 'active' : ''}`} onClick={handleLinkClick}>Sponsors</Link></li>

          {/* Auth Button - direct registration link from Hero (offline) */}
          <li className="auth-item">
            <a
              href="https://unstop.com/p/global-model-united-nations-2026-gmun-iit-kharagpur-1606090"
              className="magnetic-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              Register
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;