const express = require('express');
const router = express.Router();
const { getNotices, getNoticeById } = require('../controllers/noticeController');

router.get('/', getNotices);
router.get('/:id', getNoticeById);

module.exports = router;
