import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gmunlogo from "../images/GMUN Gold.png";
import edition from "../images/3rd.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handlelogout = async () => {
    try {
      await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      dispatch(logout());
      navigate("/");
      closeMobileMenu();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className="glass-capsule">
        
        {/* Logo */}
        <div className="logo-section">
          <Link to="/" onClick={closeMobileMenu}>
            <div className="logo-3d-wrapper">
              <img src={gmunlogo} alt="GMUN" className="logo-face front" />
              <img src={edition} alt="3rd" className="logo-face back" />
            </div>
          </Link>
        </div>

        {/* Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><Link to="/" className="roll-text" data-text="Home" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/sec" className="roll-text" data-text="Secretariat" onClick={closeMobileMenu}>Secretariat</Link></li>
          <li><Link to="/how-to-mun" className="roll-text" data-text="How to MUN" onClick={closeMobileMenu}>How to MUN</Link></li>
          
          {/* FIX: "dropdown-trigger" handles the menu (Overflow Visible)
             "roll-text" handles the animation (Overflow Hidden) 
          */}
          <li className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
            <span className="roll-text" data-text="Committees">Committees</span>
            
            <ul className="dropdown-panel">
              <li><Link to="/committee/1">UNSC</Link></li>
              <li><Link to="/committee/2">UNHRC</Link></li>
              <li><Link to="/committee/3">DISEC</Link></li>
              <li><Link to="/committee/4">LokSabha</Link></li>
              <li><Link to="/committee/5">G20</Link></li>
            </ul>
          </li>

          <li><Link to="/FAQs" className="roll-text" data-text="FAQs" onClick={closeMobileMenu}>FAQs</Link></li>
          <li><Link to="/discuss" className="roll-text" data-text="Discuss" onClick={closeMobileMenu}>Discuss</Link></li>
          <li><Link to="/AboutUs" className="roll-text" data-text="About" onClick={closeMobileMenu}>About</Link></li>
          <li><Link to="/gallery" className="roll-text" data-text="Gallery" onClick={closeMobileMenu}>Gallery</Link></li>
          <li><Link to="/Sponsors" className="roll-text" data-text="Sponsors" onClick={closeMobileMenu}>Sponsors</Link></li>

          {/* Auth Button */}
          <li className="auth-item">
            {authStatus ? (
              <button onClick={handlelogout} className="magnetic-btn">Logout</button>
            ) : (
              <Link to="/login" className="magnetic-btn" onClick={closeMobileMenu}>Login</Link>
            )}
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