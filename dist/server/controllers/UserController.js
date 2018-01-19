'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create
var create = function create(params) {
  return new _bluebird2.default(function (resolve, reject) {
    _User2.default.create(params, function (err, user) {
      if (err) {
        reject(err);
        return;
      }

      if (isRaw === true) {
        resolve(user);
      } else {
        resolve(user.summary());
      }
    });
  });
};

// Read All
var find = function find(params, isRaw) {
  return new _bluebird2.default(function (resolve, reject) {
    _User2.default.find(params, function (err, users) {
      if (err) {
        reject(err);
        return;
      }

      if (isRaw === true) {
        resolve(users);
      } else {
        var list = [];
        users.forEach(function (user, i) {
          list.push(user.summary());
        });
        resolve(list);
      }
    });
  });
};

// Read One
var findById = function findById(id, isRaw) {
  return new _bluebird2.default(function (resolve, reject) {
    _User2.default.findById(id, function (err, user) {
      if (err) {
        reject(err);
        return;
      }

      if (isRaw === true) {
        resolve(user);
      } else {
        resolve(user.summary());
      }
    });
  });
};

// Update
var update = function update(id, params) {
  return new _bluebird2.default(function (resolve, reject) {
    _User2.default.findByIdAndUpdate(id, params, { new: true }, function (err, user) {
      if (err) {
        reject(err);
        return;
      }

      if (isRaw === true) {
        resolve(user);
      } else {
        resolve(user.summary());
      }
    });
  });
};

// Delete
var _delete = function _delete(id) {
  return new _bluebird2.default(function (resolve, reject) {
    _User2.default.findByIdAndRemove(id, function (err) {
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