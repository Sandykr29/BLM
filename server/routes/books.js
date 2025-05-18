const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, author, coverImage, availability } = req.body;
    const book = await Book.create({ title, author, coverImage, availability, ownerId: req.user.id });
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/my', authMiddleware, async (req, res) => {
  const myBooks = await Book.find({ ownerId: req.user.id });
  res.json(myBooks);
});

router.patch('/:id', authMiddleware, async (req, res) => {
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user.id },
    req.body,
    { new: true }
  );
  if (!book) return res.status(403).json({ error: 'Not authorized' });
  res.json(book);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const book = await Book.findOneAndDelete({ _id: req.params.id, ownerId: req.user.id });
  if (!book) return res.status(403).json({ error: 'Not authorized' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
