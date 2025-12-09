import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Library = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for books
  const books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'fiction',
      year: 1925,
      available: true
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      category: 'fiction',
      year: 1949,
      available: false
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'fiction',
      year: 1960,
      available: true
    },
    {
      id: 4,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      category: 'science',
      year: 1988,
      available: true
    },
    {
      id: 5,
      title: 'The Art of War',
      author: 'Sun Tzu',
      category: 'history',
      year: -500,
      available: true
    },
    {
      id: 6,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'technology',
      year: 2008,
      available: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'technology', label: 'Technology' }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('library')}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover our extensive collection of books and digital resources
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className={`p-6 rounded-2xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-100' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`p-6 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                  : 'bg-white/70 border-gray-200 hover:bg-white/90'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {book.title}
                  </h3>
                  <p className={`text-sm mb-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    by {book.author}
                  </p>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {book.year > 0 ? book.year : `BCE ${Math.abs(book.year)}`}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  book.available
                    ? isDark 
                      ? 'bg-green-900/50 text-green-400 border border-green-700' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                    : isDark 
                      ? 'bg-red-900/50 text-red-400 border border-red-700' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {book.available ? 'Available' : 'Checked Out'}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={book.available ? "primary" : "secondary"}
                  size="sm"
                  disabled={!book.available}
                  className="flex-1"
                >
                  {book.available ? 'Reserve' : 'Join Waitlist'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-4"
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
              📚
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No books found
            </h3>
            <p className={`${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Stats */}
        <div className={`mt-16 p-8 rounded-2xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-gray-200'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {books.length}
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Books
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {books.filter(b => b.available).length}
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Available
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {categories.length - 1}
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Categories
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-2 ${
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

export default Library;