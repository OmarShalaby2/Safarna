import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button 
      onClick={toggleLanguage}
      className="lang-toggle-btn"
    >
      {language === 'en' ? 'AR' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
