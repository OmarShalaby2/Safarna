import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📍</span>
          Safarna
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>{t.home}</NavLink>
          <NavLink to="/destinations" className="nav-link" onClick={() => setIsOpen(false)}>{t.destinations}</NavLink>
          <NavLink to="/plan" className="nav-link" onClick={() => setIsOpen(false)}>{t.planMyTrip}</NavLink>
          <NavLink to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>{t.dashboard}</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>{t.aboutUs}</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>{t.contactUs}</NavLink>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <LanguageToggle />
          <Link to="/login" className="btn-primary login-btn">{t.login}</Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
