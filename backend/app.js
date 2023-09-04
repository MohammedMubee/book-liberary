
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); 

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Import your routes
const indexRouter = require('/api/routes/index.router.js');


// Connect to MongoDB using Mongoose
mongoose.connect(process.env.database_url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Configure middleware
app.use(bodyParser.json());
app.use(cors());





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
