const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll Number is required'],
      unique: true,
      trim: true
    },
    studentId: {
      type: String,
      unique: true,
      trim: true
    },
    department: {
      type: String,
      trim: true,
      default: 'Information Technology'
    },
    year: {
      type: String,
      trim: true,
      default: '3rd Year'
    },
    section: {
      type: String,
      trim: true,
      default: 'A'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    authProvider: {
      type: String,
      default: 'email_otp'
    },
    lastLoginAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to mirror rollNumber to studentId if missing
userSchema.pre('save', function (next) {
  if (this.rollNumber && !this.studentId) {
    this.studentId = this.rollNumber;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
