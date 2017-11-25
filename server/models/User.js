const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  local: {
    name: {
      type: String,
      default: '',
      required: true
    },
    email: {
      type: String,
      default: '',
      required: true
    },
    password: {
      type: String,
      default: '',
      required: true
    }
  },
  google: {
    id: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
});

UserSchema.methods.summary = function(){
  let summary = {
    local: {
      name: this.local.name,
      email: this.local.email
    },
    google: {
      id: this.google.id,
      email: this.google.email,
      name: this.google.name
    },
    id: this._id.toString()
  }

  return summary;
}

const User = module.exports = mongoose.model('User', UserSchema);
