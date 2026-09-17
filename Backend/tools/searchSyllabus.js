const mongoose = require('mongoose');
const Document = require('../models/Document');
const annaUnivDocuments = require('../data/documents');

/**
 * Tool: searchSyllabus
 * Performs targeted search over syllabus & curriculum documents in MongoDB Atlas or in-memory fallback.
 * 
 * @param {Object} params
 * @param {String} params.query - Search keywords
 * @param {String|Number} params.semester - Optional semester filter (e.g. 7 or 'Semester 7')
 * @param {String} params.department - Optional department filter (e.g. 'IT', 'CSE')
 * @param {Number} params.limit - Maximum results (1-10, default 5)
 */
const searchSyllabus = async ({ query = '', semester, department, limit = 5 } = {}) => {
  try {
    const maxLimit = Math.min(Math.max(parseInt(limit, 10) || 5, 1), 10);
    const isDbConnected = mongoose.connection.readyState === 1;
    let results = [];

    let searchTerms = [];
    if (query && query.trim() !== '') searchTerms.push(query.trim());
    if (semester) searchTerms.push(`semester ${semester}`);
    if (department) searchTerms.push(department);
    const combinedQuery = searchTerms.join(' ');

    if (isDbConnected) {
      let filter = { category: 'syllabus' };

      if (combinedQuery !== '') {
        filter.$or = [
          { title: { $regex: combinedQuery, $options: 'i' } },
          { content: { $regex: combinedQuery, $options: 'i' } },
          { tags: { $regex: combinedQuery, $options: 'i' } }
        ];
      }

      let docs = await Document.find(filter).limit(maxLimit);

      // If category: 'syllabus' returned no exact matches, broaden to include general syllabus documents
      if (docs.length === 0) {
        docs = await Document.find({
          $or: [
            { category: 'syllabus' },
            { title: { $regex: 'syllabus|curriculum', $options: 'i' } },
            { content: { $regex: 'syllabus|curriculum', $options: 'i' } }
          ]
        }).limit(maxLimit);
      }

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
      let syllabusDocs = annaUnivDocuments.filter(
        (doc) => doc.category === 'syllabus' || (doc.tags && doc.tags.includes('syllabus'))
      );

      if (syllabusDocs.length === 0) {
        syllabusDocs = annaUnivDocuments;
      }

      results = syllabusDocs.slice(0, maxLimit).map((doc) => ({
        title: doc.title,
        category: doc.category,
        content: doc.content,
        source: doc.source,
        tags: doc.tags || [],
        sourceType: doc.sourceType || 'official'
      }));
    }

    return {
      tool: 'searchSyllabus',
      success: true,
      results
    };
  } catch (error) {
    console.error(`[Tool searchSyllabus Error]: ${error.message}`);
    return {
      tool: 'searchSyllabus',
      success: false,
      error: error.message,
      results: []
    };
  }
};

module.exports = searchSyllabus;
