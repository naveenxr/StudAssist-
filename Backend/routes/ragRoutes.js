const express = require('express');
const router = express.Router();
const { searchRAG } = require('../controllers/ragController');

router.post('/search', searchRAG);

module.exports = router;
