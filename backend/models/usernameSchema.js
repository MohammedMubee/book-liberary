const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: {
    type: [Number], 
    default: [],
    validate: {
      validator: function (value) {
        return value.every((item) => typeof item === 'number' || item === null);
      },
      message: 'The books array should only contain numeric values or null.',
    },
  },
});

;

const userData = mongoose.model('UserData', userSchema);

module.exports = userData;
