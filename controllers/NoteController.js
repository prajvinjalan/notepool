let Note = require('../models/Note');

//CREATE

//READ ALL
function find (params, callback) {
  Note.find(params, function(err, notes){
    if(err){
      callback(err, null);
      return;
    }
  });
}

//READ ONE

//UPDATE

//DELETE

module.exports = {
  create: create,
  update: update,
  delete: _delete,
  find: find,
  findById: findById
}
