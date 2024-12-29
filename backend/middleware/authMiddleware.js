const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authenticate;
