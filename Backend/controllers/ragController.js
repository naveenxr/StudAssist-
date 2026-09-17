const { retrieveRelevantDocuments } = require('../services/ragService');

// @desc    Perform RAG knowledge base search
// @route   POST /api/rag/search
// @access  Public
const searchRAG = async (req, res, next) => {
  try {
    const { query, topK } = req.body;

    // Validate query input
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid query is required.'
      });
    }

    // Validate optional topK input
    let parsedTopK = 3;
    if (topK !== undefined) {
      const num = parseInt(topK, 10);
      if (isNaN(num) || num < 1 || num > 10) {
        return res.status(400).json({
          success: false,
          message: 'topK must be an integer between 1 and 10.'
        });
      }
      parsedTopK = num;
    }

    // Retrieve relevant documents using keyword/text RAG service
    const ragData = await retrieveRelevantDocuments(query, { topK: parsedTopK });

    // Console logging for development tracking
    console.log(`[RAG Search] Query: "${query}" | Documents Found: ${ragData.results.length}`);
    if (ragData.results.length > 0) {
      console.log(`[RAG Search] Top Results: ${ragData.results.map((r) => r.title).join(' | ')}`);
    }

    // Handle empty search results cleanly
    if (ragData.results.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          query: ragData.query,
          results: [],
          message: 'No relevant college resources were found.'
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: ragData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchRAG
};
