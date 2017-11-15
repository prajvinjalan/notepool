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
  }
});

UserSchema.methods.summary = function(){
  let summary = {
    local: {
      name: this.local.name,
      email: this.local.email
    },
    id: this._id.toString()
  }

  return summary;
}

const User = module.exports = mongoose.model('User', UserSchema);
