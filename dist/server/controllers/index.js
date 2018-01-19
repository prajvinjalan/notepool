'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NoteController = require('./NoteController');

var _NoteController2 = _interopRequireDefault(_NoteController);

var _UserController = require('./UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export resource controllers with the key being the resource name
exports.default = {
  notes: _NoteController2.default,
  users: _UserController2.default
};