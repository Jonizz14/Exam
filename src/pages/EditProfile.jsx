import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const validateProfileForm = () => {
    const errors = {};

    if (!profileData.name.trim()) {
      errors.name = 'Name is required';
    } else if (profileData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'Email is invalid';
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;

    setProfileLoading(true);
    setProfileMessage('');
    
    try {
      const result = await updateProfile(profileData);
      
      if (result.success) {
        setProfileMessage('Profile updated successfully!');
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setProfileErrors({ general: result.message });
      }
    } catch (error) {
      setProfileErrors({ general: 'An error occurred while updating profile' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;

    setPasswordLoading(true);
    setPasswordMessage('');
    
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      
      if (result.success) {
        setPasswordMessage('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordErrors({ general: result.message });
      }
    } catch (error) {
      setPasswordErrors({ general: 'An error occurred while changing password' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: '👤' },
    { id: 'password', label: 'Change Password', icon: '🔒' }
  ];

  return (
    <div className={`edit-page ${isDark ? 'edit-dark' : 'edit-light'}`}>
      <div className="edit-container">
        {/* Header */}
        <div className="edit-header">
          <Link 
            to="/profile" 
            className="edit-back"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </Link>
          
          <h1 className="edit-title">
            Edit Profile
          </h1>
          <p className="edit-subtitle">
            Update your personal information and account settings
          </p>
        </div>

        {/* Tabs */}
        <div className="edit-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`edit-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span style={{ fontSize: '16px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="edit-card">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="edit-form">
              <h2 className="edit-card-title">
                Profile Information
              </h2>

              {profileMessage && (
                <div className="edit-alert success">
                  {profileMessage}
                </div>
              )}

              {profileErrors.general && (
                <div className="edit-alert error">
                  {profileErrors.general}
                </div>
              )}

              <div className="edit-grid">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  error={profileErrors.name}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  error={profileErrors.email}
                  required
                />
              </div>

              <div className="edit-actions">
                <Link to="/profile">
                  <Button variant="secondary">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  loading={profileLoading}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="edit-form">
              <h2 className="edit-card-title">
                Change Password
              </h2>

              {passwordMessage && (
                <div className="edit-alert success">
                  {passwordMessage}
                </div>
              )}

              {passwordErrors.general && (
                <div className="edit-alert error">
                  {passwordErrors.general}
                </div>
              )}

              <div className="edit-form">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors.currentPassword}
                  required
                />

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors.newPassword}
                  required
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors.confirmPassword}
                  required
                />
              </div>

              <div className="edit-actions">
                <Link to="/profile">
                  <Button variant="secondary">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  loading={passwordLoading}
                >
                  Change Password
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Security Tips */}
        <div className="edit-tips">
          <h3 className="edit-tips-title">
            Security Tips
          </h3>
          <ul className="edit-tips-list">
            <li>• Use a strong password with at least 8 characters</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Don't reuse passwords from other accounts</li>
            <li>• Consider using a password manager for better security</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;