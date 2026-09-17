const mongoose = require('mongoose');
const { selectTool } = require('./toolRouter');
const { executeTool } = require('./toolRegistry');
const { retrieveRelevantDocuments } = require('./ragService');
const { buildRAGContext } = require('./contextBuilder');
const { generateAnswer } = require('./aiService');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

/**
 * Agent Orchestrator Service
 * Coordinates Tool Selection, Tool Execution, RAG Retrieval, Context Building, OpenRouter AI Generation,
 * and MongoDB Conversation Memory.
 * 
 * @param {Object} params
 * @param {String} params.question - User question
 * @param {Array} params.conversationHistory - Optional conversation history array
 * @param {String} params.userId - Optional User ID for database memory persistence
 * @param {String} params.conversationId - Optional Conversation ID
 * @returns {Promise<Object>} Final agent response with toolUsed metadata
 */
const processStudentQuestion = async ({ question, conversationHistory = [], userId, conversationId } = {}) => {
  if (!question || typeof question !== 'string' || question.trim() === '') {
    throw new Error('A valid question string is required.');
  }

  const cleanQuestion = question.trim();

  // 1. Tool Selection Decision
  const selectedTool = selectTool(cleanQuestion);
  let toolResult = null;

  console.log(`[AgentService] Question: "${cleanQuestion}"`);
  console.log(`[AgentService] Selected Tool: ${selectedTool || 'None (Using standard RAG)'}`);

  // 2. Execute Tool if Selected
  if (selectedTool) {
    try {
      toolResult = await executeTool(selectedTool, { query: cleanQuestion, limit: 5 });
      const count = toolResult && toolResult.results ? toolResult.results.length : 0;
      console.log(`[AgentService] Tool "${selectedTool}" executed successfully | Results count: ${count}`);
    } catch (toolError) {
      console.error(`[AgentService] Tool "${selectedTool}" execution failed: ${toolError.message}`);
      toolResult = { tool: selectedTool, success: false, results: [] };
    }
  }

  // 3. Perform RAG Retrieval for general grounding
  const ragData = await retrieveRelevantDocuments(cleanQuestion, { topK: 3 });
  console.log(`[AgentService] RAG Documents Retrieved: ${ragData.results.length}`);

  // 4. Build Combined Prompt Context
  const context = buildRAGContext(ragData.results, toolResult);

  // 5. Call OpenRouter AI Completion Service
  const aiResult = await generateAnswer({
    question: cleanQuestion,
    context: context,
    conversationHistory: conversationHistory
  });

  console.log(`[AgentService] AI Generation Complete | Model: ${aiResult.model}`);

  // 6. Format Sources List
  const sources = ragData.results.map((doc) => ({
    title: doc.title,
    category: doc.category,
    source: doc.source,
    relevance: doc.relevance
  }));

  // 7. Conversation Memory Persistence in MongoDB (if DB is connected and userId/conversationId provided)
  let activeConversationId = conversationId || null;
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected && (userId || conversationId)) {
    try {
      let conversation = null;

      if (conversationId && mongoose.Types.ObjectId.isValid(conversationId)) {
        conversation = await Conversation.findById(conversationId);
      }

      if (!conversation && userId) {
        let validUserId = userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          const demoUser = await User.findOne({ studentId: userId });
          if (demoUser) {
            validUserId = demoUser._id;
          } else {
            const newUser = await User.create({
              name: 'Demo Student',
              email: `student_${Date.now()}@example.com`,
              studentId: String(userId),
              department: 'General'
            });
            validUserId = newUser._id;
          }
        }

        conversation = await Conversation.create({
          userId: validUserId,
          title: cleanQuestion.substring(0, 40)
        });
      }

      if (conversation) {
        activeConversationId = conversation._id.toString();

        // Save User Message
        await Message.create({
          conversationId: conversation._id,
          role: 'user',
          content: cleanQuestion
        });

        // Save Assistant Message
        await Message.create({
          conversationId: conversation._id,
          role: 'assistant',
          content: aiResult.answer,
          sources: sources
        });
      }
    } catch (memError) {
      console.error(`[AgentService] Conversation memory save error: ${memError.message}`);
    }
  }

  return {
    answer: aiResult.answer,
    sources: sources,
    toolUsed: selectedTool,
    conversationId: activeConversationId,
    model: aiResult.model
  };
};

module.exports = {
  processStudentQuestion
};
