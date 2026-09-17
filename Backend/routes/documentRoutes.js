const express = require('express');
const router = express.Router();
const { getDocuments, getDocumentById } = require('../controllers/documentController');

router.get('/', getDocuments);
router.get('/:id', getDocumentById);

module.exports = router;
