const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['syllabus', 'regulations', 'faq', 'academic', 'attendance', 'examinations'],
      required: [true, 'Category is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    source: {
      type: String,
      trim: true
    },
    sourceType: {
      type: String,
      enum: ['official', 'demo'],
      default: 'official'
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

// Text index on title, content, and tags for text search
documentSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Document', documentSchema);
