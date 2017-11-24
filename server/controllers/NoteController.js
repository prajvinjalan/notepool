import Note from '../models/Note'
import Promise from 'bluebird'

// Create
const create = (params, isRaw) => {
  return new Promise((resolve, reject) => {
    Note.create(params, (err, note) => {
      if(err){
        reject(err);
        return;
      }

      if(note){
        if(isRaw === true){
          resolve(note);
        } else {
          resolve(note.summary());
        }
      }
    });
  });
}

// Read All
const find = (params, isRaw) => {
  return new Promise((resolve, reject) => {
    Note.find(params, (err, notes) => {
      if(err){
        reject(err);
        return;
      }

      if(notes){
        if(isRaw === true){
          resolve(notes);
        } else {
          let list = []
          notes.forEach((note, i) => {
            list.push(note.summary());
          });
          resolve(list);
        }
      }
    });
  });
}

// Read One
const findById = (id, isRaw) => {
  return new Promise((resolve, reject) => {
    Note.findById(id, (err, note) => {
      if(err){
        reject(err);
        return;
      }

      if(note){
        if(isRaw === true){
          resolve(note);
        } else {
          resolve(note.summary());
        }
      }
    });
  });
}

// Update
const update = (id, params, isRaw) => {
  return new Promise((resolve, reject) => {
    Note.findByIdAndUpdate(id, params, {new:true}, (err, note) => {
      if(err){
        reject(err);
        return;
      }

      if(note){
        if(isRaw === true){
          resolve(note);
        } else {
          resolve(note.summary());
        }
      }
    });
  });
}

// Delete
const _delete = (id) => {
  return new Promise((resolve, reject) => {
    Note.findByIdAndRemove(id, (err) => {
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
