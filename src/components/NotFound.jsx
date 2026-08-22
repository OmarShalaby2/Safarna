import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const NotFound = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>{t.pageNotFound}</p>
      <Link to="/" className="btn-primary">{t.goHome}</Link>
    </div>
  );
};

export default NotFound;
