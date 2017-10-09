const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  }
});

const Note = module.exports = mongoose.model('Note', NoteSchema);
