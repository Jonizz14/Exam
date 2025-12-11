import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const features = [
    {
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t('library'),
      description: 'Browse our extensive collection of books and digital resources.'
    },
    {
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('locations'),
      description: 'Find library locations near you with hours and services.'
    },
    {
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: t('about'),
      description: 'Learn more about our mission and the services we provide.'
    }
  ];

  return (
    <div className={`home-page ${isDark ? 'home-dark' : 'home-light'}`}>
      {/* Hero Section */}
      <div className="home-section home-hero">
        <div>
          <h1 className="home-title">
            {t('welcome')}, {user?.name}!
          </h1>
          <p className="home-subtitle">
            Welcome to our modern library platform. Discover, learn, and explore with ease.
          </p>
          <div className="home-actions">
            <Link to="/library">
              <Button variant="primary" size="lg">
                {t('library')}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                {t('about')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="home-features-section">
        <div className="home-features-header">
          <h2 className="home-features-title">
            What We Offer
          </h2>
          <p className="home-features-subtitle">
            Explore our comprehensive library services designed to enhance your learning experience.
          </p>
        </div>

        <div className="home-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="home-feature-card"
            >
              {feature.icon}
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-text">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="home-stats-section">
        <div className="home-stats">
          <div>
            <div className="home-stat-number">
              50K+
            </div>
            <div className="home-stat-label">
              Books
            </div>
          </div>
          <div>
            <div className="home-stat-number">
              25+
            </div>
            <div className="home-stat-label">
              Locations
            </div>
          </div>
          <div>
            <div className="home-stat-number">
              100K+
            </div>
            <div className="home-stat-label">
              Members
            </div>
          </div>
          <div>
            <div className="home-stat-number">
              24/7
            </div>
            <div className="home-stat-label">
              Digital Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;