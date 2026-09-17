/**
 * RAG (Retrieval-Augmented Generation) Retrieval Service
 * 
 * Includes fallback logic:
 * 1. If MongoDB is connected (readyState === 1): Queries Mongoose Document collection.
 * 2. If MongoDB is not connected: Searches in-memory Anna University knowledge base.
 */

const mongoose = require('mongoose');
const Document = require('../models/Document');
const annaUnivDocuments = require('../data/documents');

// Helper to normalize common student spelling typos
const normalizeTypos = (text) => {
  return text
    .toLowerCase()
    .replace(/\b(sylabbus|sylabus|syllabos|silabus|syllubus)\b/g, 'syllabus')
    .replace(/\b(attandance|atendance|attandence|attendence)\b/g, 'attendance')
    .replace(/\b(exm|exms|examm|examation|examinaton)\b/g, 'exam')
    .replace(/\b(notic|notis|notces|circuler)\b/g, 'notice')
    .replace(/\b(regulaton|regulatons|regulations2021)\b/g, 'regulations');
};

/**
 * Extracts clean keywords from user search query by stripping stop words and correcting common typos
 */
const extractKeywords = (query) => {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does',
    'for', 'from', 'how', 'i', 'in', 'is', 'it', 'my', 'me', 'of', 'on', 'or',
    'the', 'to', 'what', 'when', 'where', 'which', 'who', 'will', 'with',
    'you', 'your'
  ]);

  const normalized = normalizeTypos(query);

  return normalized
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));
};

/**
 * Retrieves and ranks relevant knowledge base documents for a given query
 * 
 * @param {String} query - User search query
 * @param {Object} options - Search options (e.g. topK)
 * @returns {Promise<Object>} Formatted search results with relevance scores
 */
const retrieveRelevantDocuments = async (query, options = {}) => {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    throw new Error('A valid search query string is required.');
  }

  const cleanQuery = normalizeTypos(query.trim());
  const topK = Math.min(Math.max(parseInt(options.topK, 10) || 3, 1), 10);
  const keywords = extractKeywords(cleanQuery);

  if (keywords.length === 0) {
    keywords.push(...cleanQuery.toLowerCase().split(/\s+/));
  }

  let candidates = [];
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    // 1. Try MongoDB Text Index Search first
    try {
      candidates = await Document.find(
        { $text: { $search: cleanQuery } },
        { score: { $meta: 'textScore' } }
      ).exec();
    } catch (err) {
      candidates = [];
    }

    // 2. If Text Search returns no results, fallback to regex keyword search
    if (candidates.length === 0 && keywords.length > 0) {
      const regexConditions = keywords.map((kw) => ({
        $or: [
          { title: { $regex: kw, $options: 'i' } },
          { content: { $regex: kw, $options: 'i' } },
          { tags: { $regex: kw, $options: 'i' } }
        ]
      }));

      try {
        candidates = await Document.find({ $or: regexConditions }).exec();
      } catch (err) {
        candidates = [];
      }
    }
  } else {
    // MongoDB is disconnected/buffering - search in-memory Anna University dataset
    console.log('[RAG Service] Searching in-memory knowledge base dataset.');
    candidates = annaUnivDocuments.filter((doc) => {
      const titleLower = (doc.title || '').toLowerCase();
      const contentLower = (doc.content || '').toLowerCase();
      const tagsLower = (doc.tags || []).map((t) => t.toLowerCase());

      return keywords.some(
        (kw) =>
          titleLower.includes(kw) ||
          contentLower.includes(kw) ||
          tagsLower.some((tag) => tag.includes(kw))
      );
    });
  }

  // Return early if no matches found
  if (!candidates || candidates.length === 0) {
    return {
      query: cleanQuery,
      results: []
    };
  }

  // Compute normalized relevance scores (0.00 to 1.00)
  const scoredDocuments = candidates.map((doc, idx) => {
    let score = 0;
    const docObj = doc.toObject ? doc.toObject() : doc;
    const titleLower = (docObj.title || '').toLowerCase();
    const contentLower = (docObj.content || '').toLowerCase();
    const tagsLower = (docObj.tags || []).map((t) => t.toLowerCase());

    if (doc._doc && doc._doc.score) {
      score += Math.min(doc._doc.score * 0.25, 0.45);
    }

    if (titleLower.includes(cleanQuery.toLowerCase())) {
      score += 0.50;
    } else {
      keywords.forEach((kw) => {
        if (titleLower.includes(kw)) score += 0.15;
      });
    }

    keywords.forEach((kw) => {
      if (tagsLower.some((tag) => tag.includes(kw))) {
        score += 0.15;
      }
    });

    let contentMatchCount = 0;
    keywords.forEach((kw) => {
      const matches = (contentLower.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length;
      if (matches > 0) {
        contentMatchCount += Math.min(matches, 5);
      }
    });
    score += Math.min(contentMatchCount * 0.04, 0.20);

    const rawNormalized = 1 - 1 / (1 + score);
    const relevance = Math.min(Math.max(Math.round(rawNormalized * 100) / 100, 0.10), 0.98);
    const docId = docObj._id ? docObj._id.toString() : `doc_${idx + 1}`;

    return {
      documentId: docId,
      title: docObj.title,
      category: docObj.category,
      content: docObj.content,
      source: docObj.source || '',
      tags: docObj.tags || [],
      relevance
    };
  });

  const filteredAndSorted = scoredDocuments
    .filter((doc) => doc.relevance >= 0.20)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, topK);

  return {
    query: cleanQuery,
    results: filteredAndSorted
  };
};

module.exports = {
  retrieveRelevantDocuments
};
