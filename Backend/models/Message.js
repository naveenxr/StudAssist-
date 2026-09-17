const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    source: String,
    relevance: Number
  },
  { _id: false }
);

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'Conversation ID is required']
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: [true, 'Role is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    sources: [sourceSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', messageSchema);
