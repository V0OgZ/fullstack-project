import React, { useState, useEffect } from 'react';
import { useTranslation, Language } from '../i18n';
import { ApiService } from '../services/api';
import './LanguageSelector.css';

interface LanguageAvailability {
  [key: string]: {
    available: boolean;
    missingScenarios: string[];
    totalScenarios: number;
    translatedScenarios: number;
  };
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [languageAvailability, setLanguageAvailability] = useState<LanguageAvailability>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLanguageAvailability = async () => {
      try {
        const availability = await ApiService.getAvailableLanguages();
        setLanguageAvailability(availability);
        console.log('Language availability:', availability);
      } catch (error) {
        console.error('Error checking language availability:', error);
        // Fallback - assume all languages are available
        setLanguageAvailability({
          fr: { available: true, missingScenarios: [], totalScenarios: 0, translatedScenarios: 0 },
          en: { available: true, missingScenarios: [], totalScenarios: 0, translatedScenarios: 0 },
          ru: { available: true, missingScenarios: [], totalScenarios: 0, translatedScenarios: 0 }
        });
      } finally {
        setLoading(false);
      }
    };

    checkLanguageAvailability();
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    const langInfo = languageAvailability[newLanguage];
    if (langInfo && langInfo.available) {
      setLanguage(newLanguage);
    } else {
      console.warn(`Language ${newLanguage} is not fully available. Missing scenarios:`, langInfo?.missingScenarios);
      // Still allow switching but show warning
      setLanguage(newLanguage);
    }
  };

  const getLanguageButtonClass = (lang: Language) => {
    const baseClass = `language-option ${language === lang ? 'active' : ''}`;
    const langInfo = languageAvailability[lang];
    
    if (loading) return baseClass;
    if (!langInfo || !langInfo.available) return `${baseClass} unavailable`;
    return baseClass;
  };

  const getLanguageTitle = (lang: Language, title: string) => {
    const langInfo = languageAvailability[lang];
    if (loading) return title;
    if (!langInfo || !langInfo.available) {
      return `${title} (${langInfo?.translatedScenarios || 0}/${langInfo?.totalScenarios || 0} scenarios translated)`;
    }
    return title;
  };

  return (
    <div className="language-selector">
      <div className="language-options">
        <button
          className={getLanguageButtonClass('fr')}
          onClick={() => handleLanguageChange('fr')}
          title={getLanguageTitle('fr', 'Français')}
          disabled={loading}
        >
          🇫🇷 FR
        </button>
        <button
          className={getLanguageButtonClass('en')}
          onClick={() => handleLanguageChange('en')}
          title={getLanguageTitle('en', 'English')}
          disabled={loading}
        >
          🇬🇧 EN
        </button>
        <button
          className={getLanguageButtonClass('ru')}
          onClick={() => handleLanguageChange('ru')}
          title={getLanguageTitle('ru', 'Русский')}
          disabled={loading}
        >
          🇷🇺 RU
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector; 