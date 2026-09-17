const { processStudentQuestion } = require('../services/agentService');

// @desc    Process student query using Agent (Tool Calling + RAG + OpenRouter AI + Memory)
// @route   POST /api/chat
// @access  Private (Protected by JWT)
const processChatMessage = async (req, res, next) => {
  try {
    const { message, conversationHistory, conversationId } = req.body;
    const userId = req.user._id ? req.user._id.toString() : req.user.id;

    // Validate input message
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid message is required.'
      });
    }

    // Limit maximum message length to 2000 characters
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message exceeds maximum allowed length of 2000 characters.'
      });
    }

    let history = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      history = conversationHistory;
    }

    // Process question via Agent Service using authenticated JWT user ID
    const result = await processStudentQuestion({
      question: message.trim(),
      conversationHistory: history,
      userId: userId,
      conversationId: conversationId
    });

    return res.status(200).json({
      success: true,
      data: {
        answer: result.answer,
        sources: result.sources,
        toolUsed: result.toolUsed,
        conversationId: result.conversationId,
        model: result.model
      }
    });
  } catch (error) {
    console.error(`[ChatController Error]: ${error.message}`);

    return res.status(503).json({
      success: false,
      message: "I couldn't retrieve that information right now. Please try again."
    });
  }
};

module.exports = {
  processChatMessage
};
