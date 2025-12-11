import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import './Locations.css';

const Locations = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const locations = [
    {
      id: 1,
      name: 'Main Library',
      address: '123 Library Street, City Center',
      phone: '+998 71 123 4567',
      hours: {
        weekdays: '8:00 AM - 10:00 PM',
        saturday: '9:00 AM - 8:00 PM',
        sunday: '10:00 AM - 6:00 PM'
      },
      services: ['Books', 'Digital Resources', 'Study Rooms', 'Computer Lab'],
      coordinates: { lat: 41.2995, lng: 69.2401 }
    },
    {
      id: 2,
      name: 'University Branch',
      address: '456 University Ave, Academic District',
      phone: '+998 71 987 6543',
      hours: {
        weekdays: '7:00 AM - 11:00 PM',
        saturday: '8:00 AM - 9:00 PM',
        sunday: '9:00 AM - 7:00 PM'
      },
      services: ['Academic Resources', 'Research Materials', 'Quiet Zones', 'Group Study'],
      coordinates: { lat: 41.3123, lng: 69.2457 }
    },
    {
      id: 3,
      name: 'Children\'s Library',
      address: '789 Kids Lane, Family Quarter',
      phone: '+998 71 555 0123',
      hours: {
        weekdays: '9:00 AM - 7:00 PM',
        saturday: '10:00 AM - 6:00 PM',
        sunday: '11:00 AM - 5:00 PM'
      },
      services: ['Children Books', 'Interactive Learning', 'Story Time', 'Educational Games'],
      coordinates: { lat: 41.2876, lng: 69.2210 }
    }
  ];

  const getCurrentDayKey = () => {
    const day = new Date().getDay();
    if (day === 0) return 'sunday';
    if (day === 6) return 'saturday';
    return 'weekdays';
  };

  const isLocationOpen = (location) => {
    const currentDay = getCurrentDayKey();
    const hours = location.hours[currentDay];
    if (!hours) return false;
    const currentHour = new Date().getHours();
    if (hours.includes('24')) return true;
    return currentHour >= 8 && currentHour <= 20;
  };

  return (
    <div className={`locations-page ${isDark ? 'locations-dark' : 'locations-light'}`}>
      <div className="locations-container">
        {/* Header */}
        <div className="locations-header">
          <h1 className="locations-title">
            {t('locations')}
          </h1>
          <p className="locations-subtitle">
            Find library locations near you with hours and services
          </p>
        </div>

        {/* Current Status */}
        <div className="status-card">
          <h2 className="status-title">
              Current Status
            </h2>
          <div className="status-row">
            <div className={`status-dot ${new Date().getHours() >= 8 && new Date().getHours() <= 20 ? '' : 'closed'}`}></div>
            <span>
              {new Date().getHours() >= 8 && new Date().getHours() <= 20 ? 'Most locations are open' : 'Most locations are closed'}
            </span>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="locations-grid">
          {locations.map((location) => (
            <div
              key={location.id}
              className="location-card"
            >
              {/* Header */}
              <div className="location-header">
                <div>
                  <h3 className="location-name">
                    {location.name}
                  </h3>
                  <div className="location-meta">
                    <svg className="meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{location.address}</span>
                  </div>
                  <div className="location-meta">
                    <svg className="meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{location.phone}</span>
                  </div>
                </div>
                <div className={isLocationOpen(location) ? 'open-badge' : 'closed-badge'}>
                  {isLocationOpen(location) ? 'Open' : 'Closed'}
                </div>
              </div>

              {/* Hours */}
              <div className="hours-section">
                <h4 className="section-title">
                  Hours
                </h4>
                <div className="hours-list">
                  <div className="flex-between">
                    <span>Monday - Friday</span>
                    <span>{location.hours.weekdays}</span>
                  </div>
                  <div className="flex-between">
                    <span>Saturday</span>
                    <span>{location.hours.saturday}</span>
                  </div>
                  <div className="flex-between">
                    <span>Sunday</span>
                    <span>{location.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="services-section">
                <h4 className="section-title">
                  Services
                </h4>
                <div className="services-tags">
                  {location.services.map((service, index) => (
                    <span
                      key={index}
                      className="service-tag"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="location-actions">
                <Button variant="primary" size="sm" className="flex-1">
                  Get Directions
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Call Location
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="map-card">
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: '22px', marginBottom: '16px' }}>
            Find Us on the Map
          </h2>
          <div className="map-placeholder">
            <div>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                🗺️
              </div>
              <p>
                Interactive map would be displayed here
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Integration with Google Maps or similar service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;