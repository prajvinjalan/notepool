import User from '../models/User'
import Promise from 'bluebird'

// Create
const create = (params) => {
  return new Promise((resolve, reject) => {
    User.create(params, (err, user) => {
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
const find = (params, isRaw) => {
  return new Promise((resolve, reject) => {
    User.find(params, (err, users) => {
      if(err){
        reject(err);
        return;
      }

      if(isRaw === true){
        resolve(users);
      } else {
        let list = []
        users.forEach((user, i) => {
          list.push(user.summary());
        });
        resolve(list);
      }
    });
  });
}

// Read One
const findById = (id, isRaw) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
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
const update = (id, params) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, params, {new:true}, (err, user) => {
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
const _delete = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(id, (err) => {
      if(err){
        reject(err);
        return;
      }
      resolve(null);
    });
  });
}

export default {
  create: create,
  update: update,
  delete: _delete,
  find: find,
  findById: findById
}
