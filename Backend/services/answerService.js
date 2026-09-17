const { retrieveRelevantDocuments } = require('./ragService');
const { buildRAGContext } = require('./contextBuilder');
const { generateAnswer } = require('./aiService');

/**
 * High-level Orchestrator Service for Student RAG + OpenRouter Answer Generation
 * 
 * Flow:
 * 1. Retrieve relevant knowledge base documents using RAG lexical search.
 * 2. Format retrieved documents into clean prompt context string.
 * 3. Send question, context, and limited conversation history to OpenRouter.
 * 4. Return grounded answer along with concise source metadata and model identifier.
 * 
 * @param {String} question - Student input question
 * @param {Array} conversationHistory - Optional recent conversation messages
 * @returns {Promise<Object>} Final answer object with sources and model
 */
const generateStudentAnswer = async (question, conversationHistory = []) => {
  if (!question || typeof question !== 'string' || question.trim() === '') {
    throw new Error('A valid question string is required.');
  }

  const cleanQuestion = question.trim();

  // 1. Retrieve top 3 relevant documents from MongoDB knowledge base
  const ragData = await retrieveRelevantDocuments(cleanQuestion, { topK: 3 });

  // 2. Build context string
  const context = buildRAGContext(ragData.results);

  // Development logging for grounding & debugging (no sensitive data logged)
  console.log(`[RAG Answer Service] Question: "${cleanQuestion}"`);
  console.log(`[RAG Answer Service] Documents Retrieved: ${ragData.results.length}`);
  if (ragData.results.length > 0) {
    ragData.results.forEach((doc, idx) => {
      console.log(`  ${idx + 1}. ${doc.title} (Relevance: ${doc.relevance})`);
    });
  } else {
    console.log('  No matching documents found in knowledge base.');
  }

  // 3. Call OpenRouter AI service
  const aiResult = await generateAnswer({
    question: cleanQuestion,
    context: context,
    conversationHistory: conversationHistory
  });

  console.log(`[RAG Answer Service] Model Used: ${aiResult.model}`);

  // 4. Format concise sources array for client response
  const sources = ragData.results.map((doc) => ({
    title: doc.title,
    category: doc.category,
    source: doc.source,
    relevance: doc.relevance
  }));

  return {
    answer: aiResult.answer,
    sources: sources,
    model: aiResult.model
  };
};

module.exports = {
  generateStudentAnswer
};
