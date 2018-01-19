'use strict';

var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  type: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  listBody: {
    type: Array,
    default: []
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

NoteSchema.methods.summary = function () {
  var summary = {
    type: this.type,
    title: this.title,
    body: this.body,
    listBody: this.listBody,
    colour: this.colour,
    collaborators: this.collaborators,
    id: this._id.toString()
  };

  return summary;
};

var Note = module.exports = mongoose.model('Note', NoteSchema);