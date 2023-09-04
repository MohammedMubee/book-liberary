const express = require('express');
const router = express.Router();
const booksController = require('./controller/book.controller');



router.get('/allbooks', booksController.getAllBooks);
router.get('/id/:id', booksController.getBookById);
router.post('/addBook', booksController.addBook);
  
module.exports = router;
  
