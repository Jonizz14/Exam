import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const USERS_KEY = 'auth_users';
const SESSION_KEY = 'auth_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    seedDefaultUser();
    checkAuthStatus();
  }, []);

  const seedDefaultUser = () => {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) {
      const defaultUsers = [
        {
          name: 'Demo User',
          email: 'admin@example.com',
          password: '123456'
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  };

  const loadUsers = () => {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const saveSession = (email) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };

  const checkAuthStatus = () => {
    const sessionRaw = localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) {
      setIsLoading(false);
      return;
    }
    try {
      const session = JSON.parse(sessionRaw);
      const users = loadUsers();
      const found = users.find((u) => u.email === session.email);
      if (found) {
        setUser(found);
        setIsAuthenticated(true);
      } else {
        clearSession();
      }
    } catch {
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: 'Invalid credentials' };
    }
    saveSession(found.email);
    setUser(found);
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = async (name, email, password) => {
    const users = loadUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = { name, email, password };
    const updated = [...users, newUser];
    saveUsers(updated);
    saveSession(email);
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profileData) => {
    const users = loadUsers();
    const sessionRaw = localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) return { success: false, message: 'Not authenticated' };
    const session = JSON.parse(sessionRaw);
    const idx = users.findIndex((u) => u.email === session.email);
    if (idx === -1) return { success: false, message: 'User not found' };

    // Check email uniqueness if it changed
    if (
      profileData.email &&
      profileData.email.toLowerCase() !== session.email.toLowerCase() &&
      users.some((u) => u.email.toLowerCase() === profileData.email.toLowerCase())
    ) {
      return { success: false, message: 'Email already in use' };
    }

    const updatedUser = {
      ...users[idx],
      ...profileData
    };
    users[idx] = updatedUser;
    saveUsers(users);
    saveSession(updatedUser.email);
    setUser(updatedUser);
    return { success: true };
  };

  const changePassword = async (currentPassword, newPassword) => {
    const users = loadUsers();
    const sessionRaw = localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) return { success: false, message: 'Not authenticated' };
    const session = JSON.parse(sessionRaw);
    const idx = users.findIndex((u) => u.email === session.email);
    if (idx === -1) return { success: false, message: 'User not found' };
    if (users[idx].password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    users[idx].password = newPassword;
    saveUsers(users);
    return { success: true, message: 'Password updated' };
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};