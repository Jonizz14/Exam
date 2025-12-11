import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';
import './Library.css';

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
    <div className={`library-page ${isDark ? 'library-dark' : 'library-light'}`}>
      <div className="library-container">
        {/* Header */}
        <div className="library-header">
          <h1 className="library-title">
            {t('library')}
          </h1>
          <p className="library-subtitle">
            Discover our extensive collection of books and digital resources
          </p>
        </div>

        {/* Search and Filters */}
        <div className="library-filters">
          <div className="library-filter-row">
            <div className="library-search">
              <Input
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="library-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="library-grid">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="library-card"
            >
              <div className="book-header">
                <div>
                  <h3 className="book-title">
                    {book.title}
                  </h3>
                  <p className="book-author">
                    by {book.author}
                  </p>
                  <p className="book-meta">
                    {book.year > 0 ? book.year : `BCE ${Math.abs(book.year)}`}
                  </p>
                </div>
                <div className={`availability ${book.available ? 'available' : 'unavailable'}`}>
                  {book.available ? 'Available' : 'Checked Out'}
                </div>
              </div>

              <div className="book-actions">
                <Button
                  variant={book.available ? "primary" : "secondary"}
                  size="sm"
                  disabled={!book.available}
                  className="fill"
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
          <div className="library-empty">
            <div style={{ fontSize: '52px', marginBottom: '10px' }}>
              📚
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
              No books found
            </h3>
            <p>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="library-stats">
          <div className="stats-grid">
            <div>
              <div className="stat-number">
                {books.length}
              </div>
              <div className="stat-label">
                Total Books
              </div>
            </div>
            <div>
              <div className="stat-number">
                {books.filter(b => b.available).length}
              </div>
              <div className="stat-label">
                Available
              </div>
            </div>
            <div>
              <div className="stat-number">
                {categories.length - 1}
              </div>
              <div className="stat-label">
                Categories
              </div>
            </div>
            <div>
              <div className="stat-number">
                24/7
              </div>
              <div className="stat-label">
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