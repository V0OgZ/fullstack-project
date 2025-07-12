// Frontend I18n Service - Connects to backend multilingual API
import { ApiService } from './api';

export interface I18nTranslations {
  [key: string]: string;
}

export interface I18nCategory {
  [key: string]: string;
}

class I18nService {
  private cache = new Map<string, I18nTranslations>();
  private currentLanguage = 'fr';
  
  // Get current language
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
  
  // Set current language
  setCurrentLanguage(language: string): void {
    this.currentLanguage = language;
  }
  
  // Get all translations for current language
  async getTranslations(language?: string): Promise<I18nTranslations> {
    const lang = language || this.currentLanguage;
    const cacheKey = `translations_${lang}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/i18n/translations/${lang}`);
      const translations = await response.json();
      this.cache.set(cacheKey, translations);
      return translations;
    } catch (error) {
      console.error('Failed to fetch translations:', error);
      return {};
    }
  }
  
  // Get translations by category
  async getTranslationsByCategory(category: string, language?: string): Promise<I18nTranslations> {
    const lang = language || this.currentLanguage;
    const cacheKey = `translations_${lang}_${category}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/i18n/translations/${lang}/${category}`);
      const translations = await response.json();
      this.cache.set(cacheKey, translations);
      return translations;
    } catch (error) {
      console.error(`Failed to fetch translations for category ${category}:`, error);
      return {};
    }
  }
  
  // Get single translation
  async getTranslation(key: string, language?: string): Promise<string> {
    const lang = language || this.currentLanguage;
    
    try {
      const response = await fetch(`http://localhost:8080/api/i18n/translation/${lang}/${encodeURIComponent(key)}`);
      return await response.text();
    } catch (error) {
      console.error(`Failed to fetch translation for key ${key}:`, error);
      return key; // Return key as fallback
    }
  }
  
  // Get available languages
  async getAvailableLanguages(): Promise<string[]> {
    try {
      const response = await fetch('http://localhost:8080/api/i18n/languages');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch available languages:', error);
      return ['fr', 'en']; // Default fallback
    }
  }
  
  // Get available categories
  async getAvailableCategories(): Promise<string[]> {
    try {
      const response = await fetch('http://localhost:8080/api/i18n/categories');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch available categories:', error);
      return ['castle', 'unit', 'game']; // Default fallback
    }
  }
  
  // Initialize translations (for development)
  async initializeTranslations(): Promise<void> {
    try {
      await fetch('http://localhost:8080/api/i18n/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('🌍 Backend translations initialized successfully');
    } catch (error) {
      console.error('Failed to initialize translations:', error);
    }
  }
  
  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
  
  // Translate with fallback
  async t(key: string, fallback?: string): Promise<string> {
    const translation = await this.getTranslation(key);
    return translation !== key ? translation : (fallback || key);
  }
}

export const i18nService = new I18nService();
export default i18nService; 