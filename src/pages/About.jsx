import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const values = [
    {
      icon: (
        <svg className="value-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Knowledge Access',
      description: 'Making knowledge accessible to everyone, regardless of background or location.'
    },
    {
      icon: (
        <svg className="value-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community Building',
      description: 'Fostering connections and learning through shared experiences and resources.'
    },
    {
      icon: (
        <svg className="value-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'Embracing technology and modern approaches to enhance the learning experience.'
    },
    {
      icon: (
        <svg className="value-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Inclusivity',
      description: 'Creating a welcoming space for all members of our diverse community.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Director',
      description: 'Leading our mission to democratize knowledge access for over 15 years.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Technology Lead',
      description: 'Innovating digital solutions to enhance library services and accessibility.',
      image: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Outreach',
      description: 'Building bridges between the library and our diverse community.',
      image: '👩‍🎓'
    }
  ];

  const timeline = [
    {
      year: '1990',
      title: 'Foundation',
      description: 'Our library was established with a mission to serve the community.'
    },
    {
      year: '2005',
      title: 'Digital Revolution',
      description: 'Introduced digital resources and computer labs for modern learning.'
    },
    {
      year: '2015',
      title: 'Expansion',
      description: 'Opened additional branches to better serve our growing community.'
    },
    {
      year: '2023',
      title: 'Modern Platform',
      description: 'Launched our comprehensive digital platform for seamless access.'
    }
  ];

  return (
    <div className={`about-page ${isDark ? 'about-dark' : 'about-light'}`}>
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="about-title">
            {t('about')}
          </h1>
          <p className="about-subtitle">
            We are dedicated to fostering knowledge, creativity, and community connections 
            through innovative library services and inclusive learning environments.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mission-card">
          <div className="mission-emoji">📚</div>
          <h2 className="section-heading">
              Our Mission
            </h2>
          <p className="mission-text">
              To empower individuals and communities through accessible knowledge, innovative services, 
              and inclusive spaces that inspire lifelong learning, creativity, and personal growth.
          </p>
        </div>

        {/* Values */}
        <div className="values-section">
          <h2 className="values-title">
            Our Values
          </h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card"
              >
                {value.icon}
                <h3 className="value-title">
                  {value.title}
                </h3>
                <p className="value-text">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <h2 className="timeline-title">
            Our Journey
          </h2>
          <div className="timeline-wrapper">
            <div className="timeline-list">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-card">
                    <div className="timeline-year">
                      {item.year}
                    </div>
                    <h3 className="timeline-title-text">
                      {item.title}
                    </h3>
                    <p className="timeline-desc">
                      {item.description}
                    </p>
                  </div>
                  <div className="timeline-dot"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="team-section">
          <h2 className="team-title">
            Meet Our Team
          </h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card"
              >
                <div className="team-emoji">{member.image}</div>
                <h3 className="team-name">
                  {member.name}
                </h3>
                <div className="team-role">
                  {member.role}
                </div>
                <p className="team-desc">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stats-card">
            <h2 className="stats-title">
            By the Numbers
          </h2>
            <div className="stats-grid">
              <div>
                <div className="stat-number">33+</div>
                <div className="stat-text">Years of Service</div>
              </div>
              <div>
                <div className="stat-number">100K+</div>
                <div className="stat-text">Members Served</div>
              </div>
              <div>
                <div className="stat-number">50K+</div>
                <div className="stat-text">Books in Collection</div>
              </div>
              <div>
                <div className="stat-number">24/7</div>
                <div className="stat-text">Digital Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;