

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);

  const user = users.find((u) => u.username === username && u.password === password);
  console.log('Found user', user);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}

exports. getUserBooks = (req, res) =>{
  const { userId } = req.params;
  const user = users.find((u) => u.userId === userId);

  if (user) {
    res.json({ success: true, books: user.books });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
}

