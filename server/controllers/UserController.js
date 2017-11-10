const User = require('../models/User');
const Promise = require('bluebird');

// Create
function create (params) {
  return new Promise(function(resolve, reject) {
    User.create(params, function(err, user){
      if(err){
        reject(err);
        return;
      }
      resolve(user);
    });
  });
}

// Read All
function find (params) {
  return new Promise(function(resolve, reject) {
    User.find(params, function(err, users){
      if(err){
        reject(err);
        return;
      }
      resolve(users)
    });
  });
}

// Read One
function findById (id, callback) {
  return new Promise(function(resolve, reject) {
    User.findById(id, function(err, user){
      if(err){
        reject(err);
        return;
      }
      resolve(user);
    });
  });
}

// Update
function update (id, params) {
  return new Promise(function(resolve, reject) {
    User.findByIdAndUpdate(id, params, {new:true}, function(err, user){
      if(err){
        reject(err);
        return;
      }
      resolve(user);
    });
  });
}

// Delete
function _delete (id, callback) {
  return new Promise(function(resolve, reject) {
    User.findByIdAndRemove(id, function(err){
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
