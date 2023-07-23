const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Authorization token not provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY , (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Store the user data from the token in the request object for use in other middlewares/routes
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
