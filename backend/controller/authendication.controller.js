const User = require('../models/usernameSchema'); 
const Book = require('../models/bookSchema'); 


exports.singup = async (req,res) =>{
  try{
    const {username,password} = req.body;
    const sigin = await User.create({username,password})
    if(sigin){
      res.json({success:true, message :'sigup successfl'})
    }else{
      res.status(401).json({success:false, message:'invalid credentials'});
    }
  }catch(error){
    console.error(message = "internal server is error")

  }

  
}

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
      const userBooks = await Book.find({ id: { $in: user.books } });

      const transformedBooks = userBooks.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        coverImage: book.coverImage,
      }));

      res.json({ success: true, books: transformedBooks });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserBooks route:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
