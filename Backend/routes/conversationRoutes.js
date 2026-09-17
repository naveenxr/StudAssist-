const express = require('express');
const router = express.Router();
const {
  getConversations,
  getConversationMessages,
  createConversation,
  deleteConversation
} = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getConversations);
router.post('/', createConversation);
router.get('/:conversationId/messages', getConversationMessages);
router.delete('/:conversationId', deleteConversation);

module.exports = router;
