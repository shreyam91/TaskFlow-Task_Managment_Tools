// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

module.exports = async function (req, res, next) {
  let token = req.header('Authorization')?.split(' ')[1];
  
  // Development bypass: if token is missing or 'null', auto-assign a dev user
  if (!token || token === 'null' || token === 'undefined' || token === 'dev-bypass-token') {
    try {
      let user = await prisma.user.findFirst();
      if (!user) {
        user = await prisma.user.create({
          data: {
            firstname: 'Dev',
            lastname: 'User',
            username: 'devuser',
            email: 'dev@example.com',
            password: 'password123',
            role: 'admin'
          }
        });
      }
      req.user = { id: user.id, role: user.role };
      return next();
    } catch (err) {
      console.error('Error in dev bypass:', err);
      return res.status(500).json({ msg: 'Server error during dev bypass' });
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
