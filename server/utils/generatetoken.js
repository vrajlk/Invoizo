const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // In production, always use environment variables

const generateToken = (User) => {
  return jwt.sign(
    { 
      number: User.number,
      password: User.password,
      isAdmin: User.isAdmin,
      adminId: User.adminId,
      _id: User.adminId,
      userId:User._id
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = { generateToken, JWT_SECRET };