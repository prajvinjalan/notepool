'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Note = require('../models/Note');

var _Note2 = _interopRequireDefault(_Note);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create
var create = function create(params, isRaw) {
  return new _bluebird2.default(function (resolve, reject) {
    _Note2.default.create(params, function (err, note) {
      if (err) {
        reject(err);
        return;
      }

      if (note) {
        if (isRaw === true) {
          resolve(note);
        } else {
          resolve(note.summary());
        }
      }
    });
  });
};

// Read All
var find = function find(params, isRaw) {
  return new _bluebird2.default(function (resolve, reject) {
    _Note2.default.find(params, function (err, notes) {
      if (err) {
        reject(err);
        return;
      }

      if (notes) {
        if (isRaw === true) {
          resolve(notes);
        } else {
          var list = [];
          notes.forEach(function (note, i) {
            list.push(note.summary());
          });
          resolve(list);
        }
      }
    });
  });
};

// Read One
var findById = function findById(id, isRaw) {
  return new _bluebird2.default(function (resolve, reject) {
    _Note2.default.findById(id, function (err, note) {
      if (err) {
        reject(err);
        return;
      }

      if (note) {
        if (isRaw === true) {
          resolve(note);
        } else {
          resolve(note.summary());
        }
      }
    });
  });
};

// Update
var update = function update(id, params, isRaw) {
  return new _bluebird2.default(function (resolve, reject) {
    _Note2.default.findByIdAndUpdate(id, params, { new: true }, function (err, note) {
      if (err) {
        reject(err);
        return;
      }

      if (note) {
        if (isRaw === true) {
          resolve(note);
        } else {
          resolve(note.summary());
        }
      }
    });
  });
};

// Delete
var _delete = function _delete(id) {
  return new _bluebird2.default(function (resolve, reject) {
    _Note2.default.findByIdAndRemove(id, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.default = {
  create: create,
  update: update,
  delete: _delete,
  find: find,
  findById: findById
};