const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// @desc    Get current user's conversations
// @route   GET /api/conversations
// @access  Private (Protected by JWT)
const getConversations = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    const conversations = await Conversation.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages for a specific conversation with ownership check
// @route   GET /api/conversations/:conversationId/messages
// @access  Private (Protected by JWT)
const getConversationMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id.toString();

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid conversation ID'
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Strict ownership verification
    if (conversation.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this conversation.'
      });
    }

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new conversation for current user
// @route   POST /api/conversations
// @access  Private (Protected by JWT)
const createConversation = async (req, res, next) => {
  try {
    const { title } = req.body;
    const userId = req.user._id;

    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        data: {
          _id: 'conv_' + Date.now(),
          userId,
          title: title || 'New Conversation'
        }
      });
    }

    const conversation = await Conversation.create({
      userId,
      title: title || 'New Conversation'
    });

    return res.status(201).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a conversation (with ownership check)
// @route   DELETE /api/conversations/:conversationId
// @access  Private (Protected by JWT)
const deleteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id.toString();

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid conversation ID'
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Conversation deleted'
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    if (conversation.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this conversation.'
      });
    }

    await Message.deleteMany({ conversationId });
    await Conversation.findByIdAndDelete(conversationId);

    return res.status(200).json({
      success: true,
      message: 'Conversation deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getConversationMessages,
  createConversation,
  deleteConversation
};
