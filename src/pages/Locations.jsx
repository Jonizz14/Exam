import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';

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

  const getCurrentTime = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    if (day === 0) return 'sunday';
    if (day === 6) return 'saturday';
    return 'weekdays';
  };

  const isLocationOpen = (location) => {
    const currentDay = getCurrentTime();
    const hours = location.hours[currentDay];
    
    if (!hours) return false;
    
    // Simple time parsing (this could be more sophisticated)
    if (hours.includes('24')) return true;
    
    // For demo purposes, we'll consider most daytime hours as open
    return hour >= 8 && hour <= 20;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('locations')}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Find library locations near you with hours and services
          </p>
        </div>

        {/* Current Status */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className={`p-6 rounded-2xl backdrop-blur-lg border text-center ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Current Status
            </h2>
            <div className="flex justify-center items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                new Date().getHours() >= 8 && new Date().getHours() <= 20 ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {new Date().getHours() >= 8 && new Date().getHours() <= 20 ? 'Most locations are open' : 'Most locations are closed'}
              </span>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`p-8 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                  : 'bg-white/70 border-gray-200 hover:bg-white/90'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {location.name}
                  </h3>
                  <div className={`flex items-center space-x-2 mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{location.address}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{location.phone}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isLocationOpen(location)
                    ? isDark 
                      ? 'bg-green-900/50 text-green-400 border border-green-700' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                    : isDark 
                      ? 'bg-red-900/50 text-red-400 border border-red-700' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {isLocationOpen(location) ? 'Open' : 'Closed'}
                </div>
              </div>

              {/* Hours */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span>Monday - Friday</span>
                    <span>{location.hours.weekdays}</span>
                  </div>
                  <div className={`flex justify-between ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span>Saturday</span>
                    <span>{location.hours.saturday}</span>
                  </div>
                  <div className={`flex justify-between ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span>Sunday</span>
                    <span>{location.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  {location.services.map((service, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark 
                          ? 'bg-blue-900/50 text-blue-400 border border-blue-700' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
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
        <div className={`p-8 rounded-2xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Find Us on the Map
          </h2>
          <div className={`h-64 rounded-xl flex items-center justify-center ${
            isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
          }`}>
            <div className="text-center">
              <div className={`text-4xl mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                🗺️
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Interactive map would be displayed here
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
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