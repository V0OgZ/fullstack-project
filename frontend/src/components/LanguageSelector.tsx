import React from 'react';
import { useTranslation } from '../i18n';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
  };

  return (
    <div className="language-selector">
      <div className="language-options">
        <button
          className={`language-option ${language === 'fr' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('fr')}
          title="Français"
        >
          🇫🇷 FR
        </button>
        <button
          className={`language-option ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
          title="English"
        >
          🇬🇧 EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector; 