const User = require('../models/User');

// Create
function create (params, callback) {
  User.create(params, function(err, user){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, user);
  });
}

// Read All
function find (params, callback) {
  User.find(params, function(err, users){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, users);
  });
}

// Read One
function findById (id, callback) {
  User.findById(id, function(err, user){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, user);
  });
}

// Update
function update (id, params, callback) {
  User.findByIdAndUpdate(id, params, {new:true}, function(err, user){
    if(err){
      callback(err, null);
      return;
    }
    callback(null, user);
  });
}

// Delete
function _delete (id, callback) {
  User.findByIdAndRemove(id, function(err){
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
