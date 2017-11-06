import constants from '../constants'

let initialState = [];

export default (state = initialState, action) => {

  switch (action.type){
    case constants.RECEIVE_NOTES:
      return action.payload;

    case constants.ADD_NOTE:
      return [...state, action.payload];

    case constants.UPDATE_NOTE:
      return state.map(note => {
        if(note.id === action.payload.id){
          return action.payload;
        }
      });

    case constants.DELETE_NOTE:
      return state.filter(note => note.id !== action.payload);

    default:
      return state;
  }
}
