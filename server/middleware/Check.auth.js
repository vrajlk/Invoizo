const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/generatetoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(`checkAuth: Token for ${req.method} ${req.originalUrl}:`, token ? 'Present' : 'Missing');

    if (!token) {
      console.log('checkAuth: No token provided');
      return res.status(401).json({ message: 'Authentication required', authenticated: false, isAdmin: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      _id: decoded._id || decoded.adminId, // Prefer _id, fallback to adminId
      number: decoded.number,
      isAdmin: decoded.isAdmin,
      adminId: decoded.adminId,
      userId: decoded.userId, // Add userId here
    };
   

    return next();
  } catch (error) {
    console.error('checkAuth: Error:', error.message);
    return res.status(401).json({ message: 'Invalid token', authenticated: false, isAdmin: false });
  }
};

module.exports = checkAuth;