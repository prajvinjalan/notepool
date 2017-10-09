let Note = require('../models/Note');

// Create
function create () {

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
function findById () {

}

// Update
function update () {

}

// Delete
function _delete () {

}

module.exports = {
  create: create,
  update: update,
  delete: _delete,
  find: find,
  findById: findById
}
