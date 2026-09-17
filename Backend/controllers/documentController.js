const Document = require('../models/Document');

// @desc    Get all documents with optional category and search filter
// @route   GET /api/documents
// @access  Public
const getDocuments = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category.toLowerCase();
    }

    if (search && search.trim() !== '') {
      const searchTerm = search.trim();
      query.$or = [
        { $text: { $search: searchTerm } },
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const documents = await Document.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    // If text search clause throws an error, fallback to regex search
    if (req.query.search) {
      try {
        const { category, search } = req.query;
        const searchTerm = search.trim();
        let fallbackQuery = {};

        if (category) {
          fallbackQuery.category = category.toLowerCase();
        }

        fallbackQuery.$or = [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } }
        ];

        const documents = await Document.find(fallbackQuery).sort({ createdAt: -1 });

        return res.status(200).json({
          success: true,
          count: documents.length,
          data: documents
        });
      } catch (fallbackError) {
        return next(fallbackError);
      }
    }
    next(error);
  }
};

// @desc    Get single document by ID
// @route   GET /api/documents/:id
// @access  Public
const getDocumentById = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: `Document not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDocuments,
  getDocumentById
};
