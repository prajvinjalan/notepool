const Note = require('../models/Note');
const Promise = require('bluebird');

// Create
function create (params) {
  return new Promise(function(resolve, reject) {
    Note.create(params, function(err, note){
      if(err){
        reject(err);
        return;
      }
      resolve(note);
    });
  });
}

// Read All
function find (params) {
  return new Promise(function(resolve, reject) {
    Note.find(params, function(err, notes){
      if(err){
        reject(err);
        return;
      }
      resolve(notes)
    });
  });
}

// Read One
function findById (id, callback) {
  return new Promise(function(resolve, reject) {
    Note.findById(id, function(err, note){
      if(err){
        reject(err);
        return;
      }
      resolve(note);
    });
  });
}

// Update
function update (id, params) {
  return new Promise(function(resolve, reject) {
    Note.findByIdAndUpdate(id, params, {new:true}, function(err, note){
      if(err){
        reject(err);
        return;
      }
      resolve(note);
    });
  });
}

// Delete
function _delete (id, callback) {
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
