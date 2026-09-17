const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    category: {
      type: String,
      enum: ['exam', 'academic', 'event', 'general'],
      required: [true, 'Category is required']
    },
    date: {
      type: Date,
      default: Date.now
    },
    important: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      trim: true
    },
    sourceType: {
      type: String,
      enum: ['official', 'demo'],
      default: 'demo'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Notice', noticeSchema);
