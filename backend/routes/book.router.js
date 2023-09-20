const express = require('express');
const router = express.Router();
const booksController = require('../controller/book.controller');

//book router 

router.get('/allbooks', booksController.getAllBooks);
router.get('/id/:id', booksController.getBookById);
router.post('/addBook', booksController.addBook);
router.post('/:username',booksController.addNewBook);
router.get('/GetBook',booksController.getBookBYname)
router.post('/add-to-book-list/:username',booksController.userBooklist)


module.exports = router;
  
