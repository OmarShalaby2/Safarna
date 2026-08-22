import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Loading = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{t.loading}</p>
    </div>
  );
};

export default Loading;
