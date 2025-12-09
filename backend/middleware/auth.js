const { verifyToken, findUserById } = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Add user to request object (without password)
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

// Middleware to check if user is authenticated (for frontend)
const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
        user: null
      });
    }
    
    const decoded = verifyToken(token);
    const user = findUserById(decoded.userId);
    
    if (!user) {
      return res.status(200).json({
        success: true,
        isAuthenticated: false,
        user: null
      });
    }
    
    const { password, ...userWithoutPassword } = user;
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      user: userWithoutPassword
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      user: null
    });
  }
};

module.exports = {
  authenticateToken,
  isAuthenticated
};