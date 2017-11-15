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

      if(isRaw === true){
        resolve(user);
      } else {
        resolve(user.summary());
      }
    });
  });
}

// Read All
function find (params, isRaw) {
  return new Promise(function(resolve, reject) {
    User.find(params, function(err, users){
      if(err){
        reject(err);
        return;
      }

      if(isRaw === true){
        resolve(users);
      } else {
        let list = []
        users.forEach(function(user, i){
          list.push(user.summary());
        });
        resolve(list);
      }
    });
  });
}

// Read One
function findById (id, isRaw) {
  return new Promise(function(resolve, reject) {
    User.findById(id, function(err, user){
      if(err){
        reject(err);
        return;
      }

      if(isRaw === true){
        resolve(user);
      } else {
        resolve(user.summary());
      }
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

      if(isRaw === true){
        resolve(user);
      } else {
        resolve(user.summary());
      }
    });
  });
}

// Delete
function _delete (id) {
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
