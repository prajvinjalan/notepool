let Note = require('../models/Note');

// Create
function create (params, callback) {
  Note.create(params, function(err, note){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, note);
  });
}

// Read All
function find (params, callback) {
  Note.find(params, function(err, notes){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, notes);
  });
}

// Read One
function findById (id, callback) {
  Note.findById(id, function(err, note){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, note);
  });
}

// Update
function update (id, params, callback) {
  Note.findByIdAndUpdate(id, prarams, {new:true}, function(err, note){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, note);
  });
}

// Delete
function _delete (id, callback) {
  Note.findByIdAndRemove(id, function(err){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, null);
  });
}

module.exports = {
  create: create,
  update: update,
  delete: _delete,
  find: find,
  findById: findById
}
