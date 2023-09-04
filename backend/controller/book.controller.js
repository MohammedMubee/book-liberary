
const { Router } = require('express');
const router = Router();

const fs = require("fs");

function getBooksData() {
  try {
    const rawData = fs.readFileSync('book.json', 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error fetching books data:', error);
    return [];
  }
}

function saveBooksData(books) {
  fs.writeFileSync('book.json', JSON.stringify(books, null, 2));
}

exports.getAllBooks = (req, res) => {
  const books = getBooksData();
  res.json(books);
};

exports.getBookById = (req, res) => {
  const books = getBooksData();
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
};

exports.addBook = (req, res) => {
  const { body } = req;
  console.log(body);

  const books = getBooksData();
  books.push(body);

  saveBooksData(books);
  res.status(201).json({ message: 'Book added successfully', ...body });
};


