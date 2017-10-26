const NoteController = require('./NoteController');
const UserController = require('./UserController')

// export resource controllers with the key being the resource name
module.exports = {
  notes: NoteController,
  users: UserController
}
