const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory user storage (for demo purposes)
let users = [];
let userIdCounter = 1;

// User schema (for validation and structure)
const userSchema = {
  id: { type: 'number', required: true },
  name: { type: 'string', required: true, minLength: 2, maxLength: 50 },
  email: { type: 'string', required: true, unique: true, format: 'email' },
  password: { type: 'string', required: true, minLength: 6 },
  createdAt: { type: 'date', default: () => new Date() },
  updatedAt: { type: 'date', default: () => new Date() }
};

// Create a new user
const createUser = async (userData) => {
  const { name, email, password } = userData;
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Create new user
  const newUser = {
    id: userIdCounter++,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Find user by ID
const findUserById = (id) => {
  return users.find(user => user.id === id);
};

// Update user
const updateUser = async (id, updateData) => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const user = users[userIndex];
  
  // Update allowed fields
  const allowedFields = ['name', 'email'];
  Object.keys(updateData).forEach(key => {
    if (allowedFields.includes(key)) {
      user[key] = updateData[key];
    }
  });
  
  user.updatedAt = new Date();
  users[userIndex] = user;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Update user password
const updateUserPassword = async (id, newPassword) => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  users[userIndex].password = hashedPassword;
  users[userIndex].updatedAt = new Date();
  
  return true;
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Get all users (admin function)
const getAllUsers = () => {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  updateUserPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  getAllUsers
};