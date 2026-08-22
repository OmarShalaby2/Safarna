import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="logo-icon">📍</span> Safarna
        </div>
        <p>&copy; {new Date().getFullYear()} Safarna. {t.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
