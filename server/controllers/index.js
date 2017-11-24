import NoteController from './NoteController'
import UserController from './UserController'

// export resource controllers with the key being the resource name
export default {
  notes: NoteController,
  users: UserController
}
