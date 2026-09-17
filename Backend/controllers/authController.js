const crypto = require('crypto');
const mongoose = require('mongoose');

let jwt;
try {
  jwt = require('jsonwebtoken');
} catch (err) {
  jwt = {
    sign: (payload) => Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 86400 * 1000 })).toString('base64url'),
    verify: (token) => JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
  };
}

const Otp = require('../models/Otp');
const User = require('../models/User');
const { sendOtpEmail } = require('../config/mailer');

// In-memory fallback stores if MongoDB is offline
const localOtpStore = new Map();
const localUserStore = new Map();
const localPendingSignups = new Map();

/**
 * Generates a cryptographically secure 6-digit OTP string
 */
const generateSecureOtp = () => {
  const num = crypto.randomInt(100000, 1000000);
  return String(num);
};

/**
 * Secure OTP Hashing using Node.js built-in crypto HMAC SHA256
 */
const hashOtp = (otpCode) => {
  const secret = process.env.JWT_SECRET || 'studassist_otp_secret_key_2026';
  return crypto.createHmac('sha256', secret).update(String(otpCode)).digest('hex');
};

const verifyOtpHash = (inputOtp, storedHash) => {
  if (!inputOtp || !storedHash) return false;
  const hash = hashOtp(inputOtp);
  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
  } catch (err) {
    return false;
  }
};

// @desc    Send Signup OTP for New Student Registration
// @route   POST /api/auth/send-signup-otp
// @access  Public
const sendSignupOtp = async (req, res, next) => {
  try {
    const { name, email, rollNumber, department, year, section } = req.body;

    // Validate required fields
    if (!name || !email || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email, and Roll Number are required.'
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRoll = rollNumber.trim().toUpperCase();
    const isDbConnected = mongoose.connection.readyState === 1;

    // Check ALLOWED_EMAIL_DOMAIN if configured
    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN;
    if (allowedDomain && allowedDomain.trim() !== '') {
      const domain = allowedDomain.trim().toLowerCase();
      if (!normalizedEmail.endsWith(`@${domain}`)) {
        return res.status(400).json({
          success: false,
          message: `Only email addresses ending with @${domain} are permitted.`
        });
      }
    }

    // Duplicate Checks
    if (isDbConnected) {
      const existingEmail = await User.findOne({ email: normalizedEmail });
      if (existingEmail && existingEmail.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists. Please login.'
        });
      }

      const existingRoll = await User.findOne({
        $or: [{ rollNumber: normalizedRoll }, { studentId: normalizedRoll }]
      });
      if (existingRoll && existingRoll.isVerified && existingRoll.email !== normalizedEmail) {
        return res.status(400).json({
          success: false,
          message: 'A student with this roll number already exists.'
        });
      }
    } else {
      const existingUser = localUserStore.get(normalizedEmail);
      if (existingUser && existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists. Please login.'
        });
      }
    }

    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES, 10) || 5;
    const cooldownSeconds = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS, 10) || 60;

    // Cooldown check
    if (isDbConnected) {
      const existingOtp = await Otp.findOne({ email: normalizedEmail, type: 'signup' }).sort({ createdAt: -1 });
      if (existingOtp) {
        const secondsSinceLastSent = (Date.now() - new Date(existingOtp.lastSentAt).getTime()) / 1000;
        if (secondsSinceLastSent < cooldownSeconds) {
          const waitTime = Math.ceil(cooldownSeconds - secondsSinceLastSent);
          return res.status(429).json({
            success: false,
            message: `Please wait ${waitTime} seconds before requesting another OTP.`
          });
        }
      }
    } else {
      const existingOtp = localPendingSignups.get(normalizedEmail);
      if (existingOtp) {
        const secondsSinceLastSent = (Date.now() - existingOtp.lastSentAt) / 1000;
        if (secondsSinceLastSent < cooldownSeconds) {
          const waitTime = Math.ceil(cooldownSeconds - secondsSinceLastSent);
          return res.status(429).json({
            success: false,
            message: `Please wait ${waitTime} seconds before requesting another OTP.`
          });
        }
      }
    }

    // Generate secure 6-digit OTP
    const otpCode = generateSecureOtp();
    const otpHash = hashOtp(otpCode);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    const signupDetails = {
      name: name.trim(),
      email: normalizedEmail,
      rollNumber: normalizedRoll,
      department: department ? department.trim() : 'Information Technology',
      year: year ? year.trim() : '3rd Year',
      section: section ? section.trim() : 'A'
    };

    if (isDbConnected) {
      await Otp.deleteMany({ email: normalizedEmail, type: 'signup' });
      await Otp.create({
        email: normalizedEmail,
        otpHash: otpHash,
        type: 'signup',
        signupData: signupDetails,
        expiresAt: expiresAt,
        lastSentAt: new Date(),
        attempts: 0,
        verified: false
      });
    } else {
      localPendingSignups.set(normalizedEmail, {
        otpHash: otpHash,
        otpCode: otpCode,
        signupData: signupDetails,
        expiresAt: expiresAt.getTime(),
        lastSentAt: Date.now(),
        attempts: 0
      });
    }

    // Send Email
    await sendOtpEmail(normalizedEmail, otpCode);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email.'
    });
  } catch (error) {
    console.error(`[Send Signup OTP Error]: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification code. Please try again.'
    });
  }
};

// @desc    Verify Signup OTP & Create Student Account
// @route   POST /api/auth/verify-signup-otp
// @access  Public
const verifySignupOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpString = String(otp).trim();
    const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS, 10) || 5;
    const isDbConnected = mongoose.connection.readyState === 1;

    let otpRecord = null;

    if (isDbConnected) {
      otpRecord = await Otp.findOne({ email: normalizedEmail, type: 'signup' }).sort({ createdAt: -1 });
    } else {
      otpRecord = localPendingSignups.get(normalizedEmail);
    }

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'No active signup verification code found. Please sign up again.'
      });
    }

    const expiresAtTime = otpRecord.expiresAt instanceof Date ? otpRecord.expiresAt.getTime() : otpRecord.expiresAt;
    if (Date.now() > expiresAtTime) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new OTP.'
      });
    }

    if (otpRecord.attempts >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Maximum verification attempts exceeded. Please sign up again.'
      });
    }

    const isMatch = verifyOtpHash(otpString, otpRecord.otpHash);

    if (!isMatch) {
      if (isDbConnected) {
        otpRecord.attempts += 1;
        await otpRecord.save();
      } else {
        otpRecord.attempts += 1;
      }
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code.'
      });
    }

    // Create / Update Verified Student Account in MongoDB Atlas
    const signupData = otpRecord.signupData || { email: normalizedEmail, name: 'Student', rollNumber: 'STU_' + Date.now() };

    if (isDbConnected) {
      otpRecord.verified = true;
      await otpRecord.save();

      let user = await User.findOne({ email: normalizedEmail });
      if (user) {
        user.name = signupData.name;
        user.rollNumber = signupData.rollNumber;
        user.studentId = signupData.rollNumber;
        user.department = signupData.department;
        user.year = signupData.year;
        user.section = signupData.section;
        user.isVerified = true;
        user.lastLoginAt = new Date();
        await user.save();
      } else {
        await User.create({
          name: signupData.name,
          email: normalizedEmail,
          rollNumber: signupData.rollNumber,
          studentId: signupData.rollNumber,
          department: signupData.department,
          year: signupData.year,
          section: signupData.section,
          isVerified: true,
          authProvider: 'email_otp',
          lastLoginAt: new Date()
        });
      }
    } else {
      localUserStore.set(normalizedEmail, {
        _id: 'usr_' + Date.now(),
        name: signupData.name,
        email: normalizedEmail,
        rollNumber: signupData.rollNumber,
        studentId: signupData.rollNumber,
        department: signupData.department,
        year: signupData.year,
        section: signupData.section,
        isVerified: true
      });
      localPendingSignups.delete(normalizedEmail);
    }

    return res.status(200).json({
      success: true,
      message: 'Account created successfully. Please login.'
    });
  } catch (error) {
    console.error(`[Verify Signup OTP Error]: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete registration. Please try again.'
    });
  }
};

// @desc    Send Login OTP for Existing Registered Student
// @route   POST /api/auth/send-login-otp
// @access  Public
const sendLoginOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isDbConnected = mongoose.connection.readyState === 1;

    // Check whether user exists and is verified
    if (isDbConnected) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found. Please sign up first.'
        });
      }
      if (!user.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'Please complete signup verification first.'
        });
      }
    } else {
      const user = localUserStore.get(normalizedEmail);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found. Please sign up first.'
        });
      }
    }

    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES, 10) || 5;
    const cooldownSeconds = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS, 10) || 60;

    // Cooldown check
    if (isDbConnected) {
      const existingOtp = await Otp.findOne({ email: normalizedEmail, type: 'login' }).sort({ createdAt: -1 });
      if (existingOtp) {
        const secondsSinceLastSent = (Date.now() - new Date(existingOtp.lastSentAt).getTime()) / 1000;
        if (secondsSinceLastSent < cooldownSeconds) {
          const waitTime = Math.ceil(cooldownSeconds - secondsSinceLastSent);
          return res.status(429).json({
            success: false,
            message: `Please wait ${waitTime} seconds before requesting another OTP.`
          });
        }
      }
    } else {
      const existingOtp = localOtpStore.get(normalizedEmail);
      if (existingOtp) {
        const secondsSinceLastSent = (Date.now() - existingOtp.lastSentAt) / 1000;
        if (secondsSinceLastSent < cooldownSeconds) {
          const waitTime = Math.ceil(cooldownSeconds - secondsSinceLastSent);
          return res.status(429).json({
            success: false,
            message: `Please wait ${waitTime} seconds before requesting another OTP.`
          });
        }
      }
    }

    const otpCode = generateSecureOtp();
    const otpHash = hashOtp(otpCode);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    if (isDbConnected) {
      await Otp.deleteMany({ email: normalizedEmail, type: 'login' });
      await Otp.create({
        email: normalizedEmail,
        otpHash: otpHash,
        type: 'login',
        expiresAt: expiresAt,
        lastSentAt: new Date(),
        attempts: 0,
        verified: false
      });
    } else {
      localOtpStore.set(normalizedEmail, {
        otpHash: otpHash,
        otpCode: otpCode,
        expiresAt: expiresAt.getTime(),
        lastSentAt: Date.now(),
        attempts: 0
      });
    }

    await sendOtpEmail(normalizedEmail, otpCode);

    return res.status(200).json({
      success: true,
      message: 'Login verification code sent to your email.'
    });
  } catch (error) {
    console.error(`[Send Login OTP Error]: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification code. Please try again.'
    });
  }
};

// @desc    Verify Login OTP & Issue JWT Session Token
// @route   POST /api/auth/verify-login-otp
// @access  Public
const verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpString = String(otp).trim();
    const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS, 10) || 5;
    const isDbConnected = mongoose.connection.readyState === 1;

    let otpRecord = null;

    if (isDbConnected) {
      otpRecord = await Otp.findOne({ email: normalizedEmail, type: 'login' }).sort({ createdAt: -1 });
    } else {
      otpRecord = localOtpStore.get(normalizedEmail);
    }

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'No active login verification code found for this email. Please request a new OTP.'
      });
    }

    const expiresAtTime = otpRecord.expiresAt instanceof Date ? otpRecord.expiresAt.getTime() : otpRecord.expiresAt;
    if (Date.now() > expiresAtTime) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new OTP.'
      });
    }

    if (otpRecord.attempts >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Maximum verification attempts exceeded. Please request a new OTP.'
      });
    }

    const isMatch = verifyOtpHash(otpString, otpRecord.otpHash);

    if (!isMatch) {
      if (isDbConnected) {
        otpRecord.attempts += 1;
        await otpRecord.save();
      } else {
        otpRecord.attempts += 1;
      }
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code.'
      });
    }

    let user = null;

    if (isDbConnected) {
      otpRecord.verified = true;
      await otpRecord.save();

      user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found. Please sign up first.'
        });
      }
      user.lastLoginAt = new Date();
      await user.save();
    } else {
      user = localUserStore.get(normalizedEmail);
    }

    const secret = process.env.JWT_SECRET || 'studassist_super_secret_jwt_key_2026_annauniv';
    const token = jwt.sign(
      {
        userId: user._id.toString()
      },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          rollNumber: user.rollNumber || user.studentId,
          studentId: user.studentId || user.rollNumber,
          department: user.department,
          year: user.year,
          section: user.section
        },
        token: token
      }
    });
  } catch (error) {
    console.error(`[Verify Login OTP Error]: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify code. Please try again.'
    });
  }
};

// @desc    Get Current Authenticated Student Profile
// @route   GET /api/auth/me
// @access  Private (Protected by JWT)
const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id ? user._id.toString() : user.id,
          name: user.name,
          email: user.email,
          rollNumber: user.rollNumber || user.studentId,
          studentId: user.studentId || user.rollNumber,
          department: user.department,
          year: user.year,
          section: user.section
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendSignupOtp,
  verifySignupOtp,
  sendLoginOtp,
  verifyLoginOtp,
  sendOtp: sendLoginOtp,
  verifyOtp: verifyLoginOtp,
  getMe
};
