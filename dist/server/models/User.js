'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  local: {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },
  google: {
    id: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  facebook: {
    id: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
});

UserSchema.methods.summary = function () {
  var summary = {
    local: {
      name: this.local.name,
      email: this.local.email
    },
    google: {
      id: this.google.id,
      email: this.google.email,
      name: this.google.name
    },
    facebook: {
      id: this.facebook.id,
      email: this.facebook.email,
      name: this.facebook.name
    },
    id: this._id.toString()
  };

  return summary;
};

var User = module.exports = mongoose.model('User', UserSchema);