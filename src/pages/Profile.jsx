import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import './Profile.css';

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
        return 'status-badge status-warning';
      case 'On Time':
        return 'status-badge status-success';
      default:
        return 'status-badge status-neutral';
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
        className={`star ${index < rating ? 'active' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={`profile-page ${isDark ? 'profile-dark' : 'profile-light'}`}>
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          <h1 className="profile-title">
            {t('welcome')}, {user?.name}!
          </h1>
          <p className="profile-subtitle">
            Manage your library account and reading activity
          </p>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions">
          <Link to="/profile/edit">
            <Button variant="primary" size="lg">
              {t('edit')} Profile
            </Button>
          </Link>
        </div>

        <div className="profile-grid">
          {/* Profile Information */}
          <div className="profile-card">
            <h2 className="profile-card-title">
              {t('profileInfo')}
            </h2>
            
            <div className="profile-info">
              <div>
                <label className="profile-label">
                  Name
                </label>
                <p className="profile-text">
                  {user?.name}
                </p>
              </div>
              
              <div>
                <label className="profile-label">
                  Email
                </label>
                <p className="profile-text">
                  {user?.email}
                </p>
              </div>
              
              <div>
                <label className="profile-label">
                  Member Since
                </label>
                <p className="profile-text">
                  {formatDate(user?.createdAt || '2024-01-01')}
                </p>
              </div>
              
              <div>
                <label className="profile-label">
                  Account Type
                </label>
                <p className="profile-text">
                  Standard Member
                </p>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-card-title" style={{ fontSize: '18px', marginBottom: '10px' }}>
                Account Statistics
              </h3>
              <div className="profile-stats">
                <div className="profile-stat-row">
                  <span>Books Borrowed</span>
                  <span className="profile-stat-value">12</span>
                </div>
                <div className="profile-stat-row">
                  <span>Currently Borrowed</span>
                  <span className="profile-stat-value">2</span>
                </div>
                <div className="profile-stat-row">
                  <span>Books Read</span>
                  <span className="profile-stat-value">34</span>
                </div>
                <div className="profile-stat-row">
                  <span>Average Rating</span>
                  <span className="profile-stat-value">4.2★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Currently Borrowed */}
          <div className="profile-card">
            <h2 className="profile-card-title">
              Currently Borrowed
            </h2>
            
            {borrowedBooks.length > 0 ? (
              <div className="book-list">
                {borrowedBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <div className="book-top" style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                      <div>
                        <h3 className="book-title">
                          {book.title}
                        </h3>
                        <p className="book-meta">
                          by {book.author}
                        </p>
                      </div>
                      <span className={getStatusColor(book.status)}>
                        {book.status}
                      </span>
                    </div>
                    <div className="book-footer">
                      <span>
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
              <div className="profile-empty">
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  📚
                </div>
                <p>
                  No books currently borrowed
                </p>
              </div>
            )}
          </div>

          {/* Reading History */}
          <div className="profile-card">
            <h2 className="profile-card-title">
              Reading History
            </h2>
            
            {readingHistory.length > 0 ? (
              <div className="book-list">
                {readingHistory.map((book) => (
                  <div key={book.id} className="book-card">
                    <h3 className="book-title">
                      {book.title}
                    </h3>
                    <p className="book-meta">
                      by {book.author}
                    </p>
                    <div className="book-footer">
                      <span>
                        Returned: {formatDate(book.returnedDate)}
                      </span>
                      <div className="stars">
                        {renderStars(book.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty">
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  📖
                </div>
                <p>
                  No reading history yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Section */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <div className="logout-card">
            <h3 className="logout-title">
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