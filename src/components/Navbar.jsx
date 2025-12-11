import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';
import { clsx } from 'clsx';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { t, cycleLanguage, availableLanguages, language } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/library', label: t('library') },
    { path: '/locations', label: t('locations') },
    { path: '/about', label: t('about') },
    { path: '/contact', label: t('contact') }
  ];

  return (
    <nav className={clsx('navbar', isDark ? 'navbar-dark' : 'navbar-light')}>
      <div className="nav-container">
        <div className="nav-inner">
          {/* Logo */}
          <div className="brand">
            <Link to="/" className="brand">
              <div className="brand-logo">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="brand-text">
                Library
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'nav-link',
                  location.pathname === item.path && 'active'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="nav-controls">
            {/* Language Toggle */}
            <div className="lang-menu">
              <button className="lang-trigger">
                <span style={{ fontSize: '18px' }}>
                  {availableLanguages.find(lang => lang.code === language)?.flag}
                </span>
              </button>
              
              <div className="lang-list">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => cycleLanguage()}
                    className={clsx(
                      'lang-item',
                      language === lang.code && 'active'
                    )}
                  >
                    <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
            >
              {isDark ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="auth-links">
                <Link
                  to="/profile"
                  className={clsx(
                    'nav-link',
                    location.pathname === '/profile' && 'active'
                  )}
                >
                  {user?.name}
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                >
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    {t('signup')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-toggle"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={clsx('mobile-menu', isMenuOpen && 'open')}>
          <div className="mobile-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  'mobile-link',
                  location.pathname === item.path && 'active'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;