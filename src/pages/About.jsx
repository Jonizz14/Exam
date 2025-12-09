import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const values = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Knowledge Access',
      description: 'Making knowledge accessible to everyone, regardless of background or location.'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community Building',
      description: 'Fostering connections and learning through shared experiences and resources.'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'Embracing technology and modern approaches to enhance the learning experience.'
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('about')}
          </h1>
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We are dedicated to fostering knowledge, creativity, and community connections 
            through innovative library services and inclusive learning environments.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className={`p-8 md:p-12 rounded-3xl backdrop-blur-lg border text-center ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <div className="text-6xl mb-6">📚</div>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Our Mission
            </h2>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              To empower individuals and communities through accessible knowledge, innovative services, 
              and inclusive spaces that inspire lifelong learning, creativity, and personal growth.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-lg border text-center transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                    : 'bg-white/70 border-gray-200 hover:bg-white/90'
                }`}
              >
                <div className="text-blue-500 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-6 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 p-6 rounded-2xl backdrop-blur-lg border ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-white/70 border-gray-200'
                  }`}>
                    <div className={`text-2xl font-bold mb-2 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {item.year}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${
                    isDark ? 'bg-blue-500' : 'bg-blue-600'
                  }`}></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-lg border text-center transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                    : 'bg-white/70 border-gray-200 hover:bg-white/90'
                }`}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {member.name}
                </h3>
                <div className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {member.role}
                </div>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`p-8 rounded-2xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-gray-200'
        }`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                33+
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Years of Service
              </div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                100K+
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Members Served
              </div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                50K+
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Books in Collection
              </div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                24/7
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Digital Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;