const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/generatetoken");

const Dashauth = (req, res,) => {
    try {
        const token = req.cookies.token; // Get token from cookies
    
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


