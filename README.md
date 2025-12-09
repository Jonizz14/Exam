# Library Web Application

A modern, full-stack library management system with authentication, multilingual support (Uzbek, English, Russian), and light/dark mode toggle.

## 🌟 Features

### Authentication System
- **JWT-based authentication** with secure token management
- **User registration and login** with comprehensive validation
- **Profile management** with name, email, and password updates
- **Protected routes** ensuring secure access to authenticated areas
- **Auto-redirect** for authenticated users

### Modern UI/UX
- **Responsive design** that works perfectly on all devices
- **Light/Dark mode toggle** with smooth transitions
- **Multilingual support** (Uzbek → English → Russian)
- **Modern minimalistic design** with clean typography
- **Smooth gradients** and professional aesthetics
- **No hover effects** as requested

### Core Pages
- **Home Page** - Welcome dashboard with user greeting
- **Library Page** - Browse and search books with filtering
- **Locations Page** - Find library branches with hours and services
- **About Us Page** - Information about the library and team
- **Contact Page** - Get in touch form with FAQ section
- **Profile Page** - User account management and reading statistics
- **Edit Profile Page** - Update personal information and passwords

### Technical Features
- **React + Vite** frontend with modern hooks and context
- **Express.js** backend with middleware and security features
- **JWT authentication** with secure token handling
- **Input validation** using Joi on both frontend and backend
- **Error handling** with user-friendly messages
- **LocalStorage** for persistent theme and language preferences

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exam
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   # Backend .env file (backend/.env)
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   MONGODB_URI=mongodb://localhost:27017/library-app
   ```

### Running the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev:full
```

#### Option 2: Run separately
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🏗 Project Structure

```
exam/
├── backend/                 # Express.js backend
│   ├── models/             # Data models (User)
│   ├── routes/             # API routes (auth, users)
│   ├── middleware/         # Authentication & validation
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   │   ├── Button.jsx      # Custom button component
│   │   ├── Input.jsx       # Custom input component
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx # Authentication state
│   │   ├── LanguageContext.jsx # Language management
│   │   └── ThemeContext.jsx # Theme management
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Home page
│   │   ├── Library.jsx     # Library browsing
│   │   ├── Locations.jsx   # Library locations
│   │   ├── About.jsx       # About us page
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Profile.jsx     # User profile
│   │   ├── EditProfile.jsx # Profile editing
│   │   ├── Login.jsx       # Login page
│   │   └── Signup.jsx      # Registration page
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── package.json            # Frontend dependencies
└── README.md              # This file
```

## 🔐 Authentication Flow

1. **Registration**: Users create account with name, email, and password
2. **Login**: JWT token generated and stored in localStorage
3. **Protected Routes**: AuthContext validates token on route access
4. **Profile Updates**: Authenticated users can update profile information
5. **Logout**: Token removed from localStorage, user redirected to login

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradients
- **Light Mode**: Clean whites and soft grays
- **Dark Mode**: Deep grays with subtle contrasts
- **Accent**: Blue, Purple, Pink gradients

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Headings**: Bold, letter-spacing optimized
- **Body Text**: Clean, readable line-height

### Components
- **Buttons**: Rounded corners, gradient backgrounds, loading states
- **Inputs**: Rounded, focused states, error handling
- **Cards**: Glass morphism effects with backdrop blur
- **Navigation**: Sticky, transparent with blur background

## 🌐 Multilingual Support

### Supported Languages
- **Uzbek (uz)** - Default language
- **English (en)** - Secondary language
- **Russian (ru)** - Tertiary language

### Language Switching
- Cycle through languages using the flag button in navbar
- Persistent language preference stored in localStorage
- All UI text and messages translated

## 🌓 Theme System

### Light Mode
- Clean white backgrounds
- Soft gray elements
- High contrast text
- Professional appearance

### Dark Mode
- Deep gray backgrounds
- Subtle color contrasts
- Optimized for low-light usage
- Maintains readability

### Theme Persistence
- User preference saved in localStorage
- Automatic theme detection on first visit
- Smooth transitions between themes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/check` - Check authentication status

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password

### Health Check
- `GET /health` - Server health status
- `GET /` - API information

## 🛡 Security Features

- **JWT Authentication** with secure token generation
- **Password Hashing** using bcryptjs
- **Input Validation** with Joi schema validation
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for secure cross-origin requests
- **Helmet.js** for security headers
- **Environment Variables** for sensitive data

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 641px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Touch-friendly interface
- Optimized typography scaling
- Adaptive navigation menu
- Flexible grid layouts

## 🧪 Development

### Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run server` - Start backend server
- `npm run dev:full` - Start both frontend and backend

### Code Quality
- ESLint configuration for code consistency
- Component-based architecture
- Context API for state management
- Custom hooks for reusable logic

## 🚀 Deployment

### Frontend (Vite)
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### Backend (Express)
```bash
cd backend
npm start
# Ensure environment variables are set for production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed as a comprehensive full-stack web application showcasing modern development practices and user experience design.

## 🔮 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Real-time notifications
- Advanced book search and filtering
- User reading recommendations
- Book reservation system
- Admin panel for library management
- Mobile app development
- Advanced analytics and reporting

---

**Built with ❤️ using React, Express, and modern web technologies**
