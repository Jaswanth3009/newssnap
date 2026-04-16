const express = require('express');
const router = express.Router();
const {
  fetchAndStoreNews,
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  toggleBookmark,
  getBookmarks,
} = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllNews);
router.get('/bookmarks', protect, getBookmarks);
router.get('/:id', getNewsById);
router.post('/', protect, createNews);
router.post('/fetch', protect, fetchAndStoreNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
