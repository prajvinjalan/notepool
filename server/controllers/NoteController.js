const Note = require('../models/Note');
const Promise = require('bluebird');

// Create
function create (params, isRaw) {
  return new Promise(function(resolve, reject) {
    Note.create(params, function(err, note){
      if(err){
        reject(err);
        return;
      }

      if(isRaw === true){
        resolve(note);
      } else {
        resolve(note.summary());
      }
    });
  });
}

// Read All
function find (params, isRaw) {
  return new Promise(function(resolve, reject) {
    Note.find(params, function(err, notes){
      if(err){
        reject(err);
        return;
      }

      if(isRaw === true){
        resolve(notes);
      } else {
        let list = []
        notes.forEach(function(note, i){
          list.push(note.summary());
        });
        resolve(list);
      }
    });
  });
}

// Read One
function findById (id, isRaw) {
  return new Promise(function(resolve, reject) {
    Note.findById(id, function(err, note){
      if(err){
        reject(err);
        return;
      }

      if(isRaw === true){
        resolve(note);
      } else {
        resolve(note.summary());
      }
    });
  });
}

// Update
function update (id, params, isRaw) {
  return new Promise(function(resolve, reject) {
    Note.findByIdAndUpdate(id, params, {new:true}, function(err, note){
      if(err){
        reject(err);
        return;
      }
      
      if(isRaw === true){
        resolve(note);
      } else {
        resolve(note.summary());
      }
    });
  });
}

// Delete
function _delete (id) {
  return new Promise(function(resolve, reject) {
    Note.findByIdAndRemove(id, function(err){
      if(err){
        reject(err);
        return;
      }
      resolve(null);
    });
  });
}

module.exports = {
  create: create,
  update: update,
  delete: _delete,
  find: find,
  findById: findById
}
