const mongoose = require('mongoose');
const Notice = require('../models/Notice');
const demoNotices = require('../data/notices');

/**
 * Tool: searchNotices
 * Performs targeted search over college notices in MongoDB Atlas or in-memory fallback.
 * 
 * @param {Object} params
 * @param {String} params.query - Search keywords
 * @param {String} params.category - Optional category ('exam', 'academic', 'event', 'general')
 * @param {Number} params.limit - Maximum number of notices to return (1-10, default 5)
 */
const searchNotices = async ({ query = '', category, limit = 5 } = {}) => {
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
          { content: { $regex: searchTerm, $options: 'i' } }
        ];
      }

      const docs = await Notice.find(filter).sort({ date: -1 }).limit(maxLimit);
      results = docs.map((doc) => ({
        title: doc.title,
        content: doc.content,
        category: doc.category,
        date: doc.date,
        important: doc.important,
        source: doc.source,
        sourceType: doc.sourceType || 'demo'
      }));
    } else {
      // In-memory fallback if MongoDB is offline
      let filtered = [...demoNotices];
      if (category) {
        filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
      }
      if (query && query.trim() !== '') {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
        );
      }
      results = filtered.slice(0, maxLimit).map((n) => ({
        title: n.title,
        content: n.content,
        category: n.category,
        date: n.date,
        important: n.important,
        source: n.source,
        sourceType: n.sourceType || 'demo'
      }));
    }

    return {
      tool: 'searchNotices',
      success: true,
      results
    };
  } catch (error) {
    console.error(`[Tool searchNotices Error]: ${error.message}`);
    return {
      tool: 'searchNotices',
      success: false,
      error: error.message,
      results: []
    };
  }
};

module.exports = searchNotices;
