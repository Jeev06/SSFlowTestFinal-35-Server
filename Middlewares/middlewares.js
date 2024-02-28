const jwt = require('jsonwebtoken');
const config  = require('../Config/config.js');

const verifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token not found" });
  }
  try {
    const decoded = jwt.verify(authHeader.replace(/^Bearer /, ""), config.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = verifyToken;