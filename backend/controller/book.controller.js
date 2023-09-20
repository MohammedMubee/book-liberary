
const fs = require("fs");
const usersData = JSON.parse(fs.readFileSync('username.json', 'utf8'));
const booksData = JSON .parse(fs.readFileSync('book.json','utf-8'))

const Book = require('../models/bookSchema')
const userData = require('../models/usernameSchema');



exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching the books", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await Book.findOne({ id: bookId });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error("Error fetching the book by ID", error);
    res.status(500).json({ error: 'Internal server error' });
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

exports.addNewBook = async (req, res) => {
  const { username } = req.params;
  const { id } = req.body;
  console.log(username,id,'add new book to users')

  try {
    const user = await userData.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    const numericBookId = parseInt(id);

    if (isNaN(numericBookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    console.log(`Parsed book ID as numeric: ${numericBookId}`);

    const book = await Book.findOne({ id: numericBookId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    console.log(`Found book: ${book}`);
    console.log(user,'user id is defined')

    if (user.books.includes(numericBookId)) {
      return res.status(400).json({ message: 'Book already exists in the user\'s collection' });
    }

    user.books.push(numericBookId);
    await user.save();
    res.json({ message: 'Book added to the user\'s collection' });
  } catch (error) {
    console.error('Error adding book to the user\'s collection', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBookBYname = async (req,res)=>{
 const {title} = req.params;
 try{
  const Book = await Book.findOne({title})

  if(!BookName){
    return res.status(404).json({message:"book id not found"})
  }
  res.status(200).json({ Book });
 }catch(error){
  res.status(500).json({error:'internal server error'})
 }
}



exports.userBooklist = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body; 

  try {
    const user = await userData.findOne({username});
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.books.includes(id)) {
      return res.status(400).json({ success: false, message: 'Book already in user book list' });
    }
    user.books.push(id);
    await user.save();
    res.json({ success: true, book:id });
  } catch (error) {
    console.error('Error adding book to user book list:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

