const express = require('express');
const router = express.Router();
const {
  sendSignupOtp,
  verifySignupOtp,
  sendLoginOtp,
  verifyLoginOtp,
  sendOtp,
  verifyOtp,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Signup Routes
router.post('/send-signup-otp', sendSignupOtp);
router.post('/verify-signup-otp', verifySignupOtp);

// Login Routes
router.post('/send-login-otp', sendLoginOtp);
router.post('/verify-login-otp', verifyLoginOtp);

// Legacy / Backward Compatible Aliases
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Protected User Profile
router.get('/me', protect, getMe);

module.exports = router;
