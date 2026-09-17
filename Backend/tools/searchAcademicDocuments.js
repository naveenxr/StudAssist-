const mongoose = require('mongoose');
const Document = require('../models/Document');
const annaUnivDocuments = require('../data/documents');

/**
 * Tool: searchAcademicDocuments
 * Performs targeted search over official academic documents and regulations in MongoDB Atlas or in-memory fallback.
 * 
 * @param {Object} params
 * @param {String} params.query - Search query
 * @param {String} params.category - Optional category ('regulations', 'academic', 'faq', 'syllabus')
 * @param {Number} params.limit - Max results (1-10, default 5)
 */
const searchAcademicDocuments = async ({ query = '', category, limit = 5 } = {}) => {
  try {
    const maxLimit = Math.min(Math.max(parseInt(limit, 10) || 5, 1), 10);
    const isDbConnected = mongoose.connection.readyState === 1;
    let results = [];

    if (isDbConnected) {
      let filter = {};
      if (category) {
        filter.category = category.toLowerCase();
      }

      if (query && query.trim() !== '') {
        const searchTerm = query.trim();
        filter.$or = [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } }
        ];
      }

      const docs = await Document.find(filter).limit(maxLimit);
      results = docs.map((doc) => ({
        title: doc.title,
        category: doc.category,
        content: doc.content,
        source: doc.source,
        tags: doc.tags || [],
        sourceType: doc.sourceType || 'official'
      }));
    } else {
      // In-memory fallback
      let filtered = [...annaUnivDocuments];
      if (category) {
        filtered = filtered.filter((doc) => doc.category.toLowerCase() === category.toLowerCase());
      }
      if (query && query.trim() !== '') {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (doc) =>
            doc.title.toLowerCase().includes(q) ||
            doc.content.toLowerCase().includes(q) ||
            (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      results = filtered.slice(0, maxLimit).map((doc) => ({
        title: doc.title,
        category: doc.category,
        content: doc.content,
        source: doc.source,
        tags: doc.tags || [],
        sourceType: doc.sourceType || 'official'
      }));
    }

    return {
      tool: 'searchAcademicDocuments',
      success: true,
      results
    };
  } catch (error) {
    console.error(`[Tool searchAcademicDocuments Error]: ${error.message}`);
    return {
      tool: 'searchAcademicDocuments',
      success: false,
      error: error.message,
      results: []
    };
  }
};

module.exports = searchAcademicDocuments;
