const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  local: {
    name: {
      type: String,
      default: '',
      required: true
    },
    email: {
      type: String,
      default: '',
      required: true
    },
    password: {
      type: String,
      default: '',
      required: true
    }
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
