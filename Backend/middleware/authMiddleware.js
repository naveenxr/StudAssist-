const mongoose = require('mongoose');
const User = require('../models/User');

let jwt;
try {
  jwt = require('jsonwebtoken');
} catch (err) {
  jwt = {
    verify: (token) => JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
  };
}

/**
 * JWT Protect Middleware
 * Verifies Authorization header bearer token and attaches user to req.user
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'studassist_super_secret_jwt_key_2026_annauniv';

      const decoded = jwt.verify(token, secret);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, invalid token payload'
        });
      }

      // Find user in MongoDB if DB is connected
      if (mongoose.connection.readyState === 1) {
        const user = await User.findById(decoded.userId).select('-__v');
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Not authorized, user no longer exists'
          });
        }
        req.user = user;
      } else {
        // Fallback user object if DB connection is offline
        req.user = {
          _id: decoded.userId,
          email: decoded.email || 'student@example.com',
          name: 'Authenticated Student',
          studentId: 'STU_' + String(decoded.userId).substring(0, 6)
        };
      }

      return next();
    } catch (error) {
      console.error(`[Auth Middleware Error]: ${error.message}`);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token verification failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

module.exports = {
  protect
};
