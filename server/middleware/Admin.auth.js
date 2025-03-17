const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/generatetoken');

const isAdmin = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { isAdmin };