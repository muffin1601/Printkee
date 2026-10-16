const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is undefined!");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role || "super_admin")) {
      return res.status(403).json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
