const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/generatetoken");

const Dashauth = (req, res,) => {
    try {
        const token = req.cookies.token; // Get token from cookies
        console.log('Raw Cookie Header:', req.headers.cookie);
        console.log('Cookies received:', req.cookies.token);
        console.log('Parsed Cookies:', req.cookies);
        console.log('normal cookies:', req.cookies);
        console.log('Token from cookies:', token);
        if (!token) {
          return res.json({ authenticated: false, isAdmin: false });
        }
    
        const decoded = jwt.verify(token, JWT_SECRET);
    
        res.json({ authenticated: true, isAdmin: decoded.isAdmin });
      
      } catch (error) {
        res.json({ authenticated: false, isAdmin: false });
      }
    
};

module.exports = Dashauth;


