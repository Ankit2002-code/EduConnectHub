const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // hashed
});

module.exports = mongoose.model('User', userSchema);
