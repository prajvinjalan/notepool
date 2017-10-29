const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  colour: {
    type: String,
    default: ''
  },
  collaborators: {
    type: Array,
    default: []
  }
});

const Note = module.exports = mongoose.model('Note', NoteSchema);
