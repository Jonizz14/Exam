import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Mock data for borrowed books
  const borrowedBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      dueDate: '2024-01-15',
      status: 'Due Soon'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      dueDate: '2024-01-22',
      status: 'On Time'
    }
  ];

  // Mock data for reading history
  const readingHistory = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      returnedDate: '2024-01-10',
      rating: 5
    },
    {
      id: 2,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      returnedDate: '2024-01-05',
      rating: 4
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Due Soon':
        return isDark ? 'bg-yellow-900/50 text-yellow-400 border-yellow-700' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'On Time':
        return isDark ? 'bg-green-900/50 text-green-400 border-green-700' : 'bg-green-50 text-green-700 border-green-200';
      default:
        return isDark ? 'bg-gray-900/50 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${index < rating ? 'text-yellow-400' : isDark ? 'text-gray-600' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('welcome')}, {user?.name}!
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage your library account and reading activity
          </p>
        </div>

        {/* Profile Actions */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            <Link to="/profile/edit">
              <Button variant="primary" size="lg">
                {t('edit')} Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('profileInfo')}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Name
                </label>
                <p className={`text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {user?.name}
                </p>
              </div>
              
              <div>
                <label className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Email
                </label>
                <p className={`text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {user?.email}
                </p>
              </div>
              
              <div>
                <label className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Member Since
                </label>
                <p className={`text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatDate(user?.createdAt || '2024-01-01')}
                </p>
              </div>
              
              <div>
                <label className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Account Type
                </label>
                <p className={`text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Standard Member
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h3 className={`font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Account Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Books Borrowed</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>12</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Currently Borrowed</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Books Read</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>34</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Average Rating</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>4.2★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Currently Borrowed */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Currently Borrowed
            </h2>
            
            {borrowedBooks.length > 0 ? (
              <div className="space-y-4">
                {borrowedBooks.map((book) => (
                  <div key={book.id} className={`p-4 rounded-xl border ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600' 
                      : 'bg-white/50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {book.title}
                        </h3>
                        <p className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          by {book.author}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(book.status)}`}>
                        {book.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Due: {formatDate(book.dueDate)}
                      </span>
                      <Button variant="outline" size="sm">
                        Renew
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`text-4xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                  📚
                </div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No books currently borrowed
                </p>
              </div>
            )}
          </div>

          {/* Reading History */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Reading History
            </h2>
            
            {readingHistory.length > 0 ? (
              <div className="space-y-4">
                {readingHistory.map((book) => (
                  <div key={book.id} className={`p-4 rounded-xl border ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600' 
                      : 'bg-white/50 border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {book.title}
                    </h3>
                    <p className={`text-sm mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      by {book.author}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Returned: {formatDate(book.returnedDate)}
                      </span>
                      <div className="flex">
                        {renderStars(book.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`text-4xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                  📖
                </div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No reading history yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-16 text-center">
          <div className={`inline-block p-6 rounded-2xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-red-900/20 border-red-700' 
              : 'bg-red-50 border-red-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-red-400' : 'text-red-700'
            }`}>
              Account Actions
            </h3>
            <Button
              onClick={logout}
              variant="danger"
              size="lg"
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;