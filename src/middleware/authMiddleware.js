const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Invalid API Key' });
  }

    if (!token) {
      return res.status(401).json({ message: 'Access Token Required' });
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = authenticateToken;
