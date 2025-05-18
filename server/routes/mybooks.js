const express = require('express');
const MyBook = require('../models/MyBook');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const books = await MyBook.find({ userId: req.user.id }).populate('bookId');
  res.json(books);
});

router.post('/:bookId', authMiddleware, async (req, res) => {
  const newEntry = await MyBook.create({ userId: req.user.id, bookId: req.params.bookId });
  res.json(newEntry);
});

router.patch('/:bookId/status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const updated = await MyBook.findOneAndUpdate(
    { userId: req.user.id, bookId: req.params.bookId },
    { status },
    { new: true }
  );
  res.json(updated);
});

router.patch('/:bookId/rating', authMiddleware, async (req, res) => {
  const { rating } = req.body;
  const updated = await MyBook.findOneAndUpdate(
    { userId: req.user.id, bookId: req.params.bookId },
    { rating },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;