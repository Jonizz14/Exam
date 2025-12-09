import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';

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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/profile" 
            className={`inline-flex items-center text-sm font-medium mb-6 ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </Link>
          
          <h1 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Edit Profile
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Update your personal information and account settings
          </p>
        </div>

        {/* Tabs */}
        <div className={`mb-8 rounded-2xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-gray-200'
        }`}>
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 first:rounded-l-2xl last:rounded-r-2xl ${
                  activeTab === tab.id
                    ? isDark 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`p-8 rounded-2xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-gray-200'
        }`}>
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Profile Information
              </h2>

              {profileMessage && (
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-green-900/50 border-green-700 text-green-200' 
                    : 'bg-green-50 border-green-200 text-green-700'
                }`}>
                  {profileMessage}
                </div>
              )}

              {profileErrors.general && (
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-red-900/50 border-red-700 text-red-200' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {profileErrors.general}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
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

              <div className="flex justify-end space-x-4">
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
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Change Password
              </h2>

              {passwordMessage && (
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-green-900/50 border-green-700 text-green-200' 
                    : 'bg-green-50 border-green-200 text-green-700'
                }`}>
                  {passwordMessage}
                </div>
              )}

              {passwordErrors.general && (
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-red-900/50 border-red-700 text-red-200' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {passwordErrors.general}
                </div>
              )}

              <div className="space-y-6">
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

              <div className="flex justify-end space-x-4">
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
        <div className={`mt-8 p-6 rounded-2xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-blue-900/20 border-blue-700' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            isDark ? 'text-blue-400' : 'text-blue-700'
          }`}>
            Security Tips
          </h3>
          <ul className={`text-sm space-y-2 ${
            isDark ? 'text-blue-300' : 'text-blue-600'
          }`}>
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