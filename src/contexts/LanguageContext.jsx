import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    library: 'Kutubxona',
    locations: 'Lokatsiyalarimiz',
    about: 'Biz haqimizda',
    contact: 'Biz bilan bog‘lanish',
    profile: 'Profil',
    login: 'Kirish',
    signup: 'Ro‘yxatdan o‘tish',
    logout: 'Chiqish',
    
    // Auth pages
    loginTitle: 'Tizimga kirish',
    signupTitle: 'Ro‘yxatdan o‘tish',
    email: 'Elektron pochta',
    password: 'Parol',
    name: 'Ism',
    confirmPassword: 'Parolni tasdiqlash',
    forgotPassword: 'Parolni unutdingizmi?',
    dontHaveAccount: 'Akkauntingiz yo‘qmi?',
    alreadyHaveAccount: 'Akkauntingiz bormi?',
    signInWith: 'yordamida kirish',
    
    // Common
    submit: 'Yuborish',
    cancel: 'Bekor qilish',
    edit: 'Tahrirlash',
    save: 'Saqlash',
    delete: 'O‘chirish',
    close: 'Yopish',
    loading: 'Yuklanmoqda...',
    error: 'Xatolik yuz berdi',
    success: 'Muvaffaqiyatli',
    
    // Profile
    welcome: 'Xush kelibsiz',
    profileInfo: 'Profil ma’lumotlari',
    changePassword: 'Parolni o‘zgartirish',
    currentPassword: 'Joriy parol',
    newPassword: 'Yangi parol',
    
    // Pages
    pageTitle: 'Kutubxona veb-ilovasi',
    description: 'Zamonaviy kutubxona boshqaruv tizimi',
    
    // Messages
    loginSuccess: 'Muvaffaqiyatli kirdingiz',
    registerSuccess: 'Muvaffaqiyatli ro‘yxatdan o‘tdingiz',
    logoutSuccess: 'Muvaffaqiyatli chiqdingiz',
    profileUpdated: 'Profil muvaffaqiyatli yangilandi',
    passwordChanged: 'Parol muvaffaqiyatli o‘zgartirildi'
  },
  en: {
    // Navigation
    home: 'Home',
    library: 'Library',
    locations: 'Locations',
    about: 'About Us',
    contact: 'Contact',
    profile: 'Profile',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    
    // Auth pages
    loginTitle: 'Sign In',
    signupTitle: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signInWith: 'Sign in with',
    
    // Common
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    save: 'Save',
    delete: 'Delete',
    close: 'Close',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    
    // Profile
    welcome: 'Welcome',
    profileInfo: 'Profile Information',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    
    // Pages
    pageTitle: 'Library Web Application',
    description: 'Modern library management system',
    
    // Messages
    loginSuccess: 'Successfully logged in',
    registerSuccess: 'Successfully registered',
    logoutSuccess: 'Successfully logged out',
    profileUpdated: 'Profile updated successfully',
    passwordChanged: 'Password changed successfully'
  },
  ru: {
    // Navigation
    home: 'Главная',
    library: 'Библиотека',
    locations: 'Наши локации',
    about: 'О нас',
    contact: 'Связаться',
    profile: 'Профиль',
    login: 'Войти',
    signup: 'Регистрация',
    logout: 'Выйти',
    
    // Auth pages
    loginTitle: 'Вход',
    signupTitle: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    name: 'Имя',
    confirmPassword: 'Подтвердите пароль',
    forgotPassword: 'Забыли пароль?',
    dontHaveAccount: 'Нет аккаунта?',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    signInWith: 'Войти с помощью',
    
    // Common
    submit: 'Отправить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    save: 'Сохранить',
    delete: 'Удалить',
    close: 'Закрыть',
    loading: 'Загрузка...',
    error: 'Произошла ошибка',
    success: 'Успешно',
    
    // Profile
    welcome: 'Добро пожаловать',
    profileInfo: 'Информация профиля',
    changePassword: 'Изменить пароль',
    currentPassword: 'Текущий пароль',
    newPassword: 'Новый пароль',
    
    // Pages
    pageTitle: 'Веб-приложение библиотеки',
    description: 'Современная система управления библиотекой',
    
    // Messages
    loginSuccess: 'Успешно вошли в систему',
    registerSuccess: 'Успешно зарегистрировались',
    logoutSuccess: 'Успешно вышли из системы',
    profileUpdated: 'Профиль успешно обновлен',
    passwordChanged: 'Пароль успешно изменен'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const cycleLanguage = () => {
    const languages = ['uz', 'en', 'ru'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const value = {
    language,
    setLanguage,
    t,
    cycleLanguage,
    availableLanguages: [
      { code: 'uz', name: 'O‘zbek', flag: '🇺🇿' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};