var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create schema for user
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20
  }
});

// craeting model for user

var User = mongoose.model('User', userSchema);
module.exports = User;