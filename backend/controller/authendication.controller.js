const User = require('../models/usernameSchema'); 
const Book = require('../models/bookSchema'); 


exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists.' });
    }
    const newUser = await User.create({ username, password });
    if (newUser) {
      res.status(201).json({ success: true, message: 'Signup successful.' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in loginUser route:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.getUserBooks = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (user) {
      
      const userBookIds = user.books.map((bookId) => parseInt(bookId));

      // Find books with numeric IDs that match the user's book IDs
      const userBooks = await Book.find({ id: { $in: userBookIds } });

      res.json({ success: true, books: userBooks });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserBooks route:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

