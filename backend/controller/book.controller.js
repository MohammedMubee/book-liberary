
const fs = require("fs");
const usersData = JSON.parse(fs.readFileSync('username.json', 'utf8'));
const booksData = JSON .parse(fs.readFileSync('book.json','utf-8'))

const Book = require('../models/bookSchema')
const userData = require('../models/usernameSchema');



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

exports.getAllBooks = async(req, res) => {
  try{
    const books = Book.find();
    res.json(books);

  }catch{
    console.error("error fetching the books ")
    res.status(505).json({message:"internal server error "})
  }
};

exports.getBookById = async(req, res) => {
  const books = Book;
  const bookId = parseInt(req.params.id);
  const book =  await books.findOne((book) => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
};

exports.addBook = async(req, res) => {
  const { body } = req;
  console.log(body);

  try{
    const newBook = await Book.create(body)
    res.status(201).json({message : 'new book added succsessfully ' ,book:newBook});
  }catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}



exports.addnewbook = async (req, res) => {
  const { username } = req.params;
  const { bookId } = req.body;

  try{

    const user = userData . findOne({username})

    if(!user){
      return res.status(404).json({message :'user is not found '})
    }

    const book = await Book.findOne({id : bookId})

    if(!book){
      return res.status(404).json({message : "bookid is not found"})
    }

    if (user.books.includes(bookId)) {
      return res.status(400).json({ message: 'Book already exists in the user\'s collection' });
    }

    user.books.push(bookId);
    await user.save();
    res.json({message :"book already exiting in user\s collection"})
}catch(error){
  console.error('error addining book to  the user collection', error)
  res.status(500).json({error: 'internal server error'})

}
  
};


exports.bookId = (req, res) => {
  const books = Book;
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
};



