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

NoteSchema.methods.summary = function(){
  let summary = {
    title: this.title,
    body: this.body,
    colour: this.colour,
    collaborators: this.collaborators,
    id: this._id.toString()
  }

  return summary;
}

const Note = module.exports = mongoose.model('Note', NoteSchema);
