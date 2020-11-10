import {
   RECEIVE_MESSAGES, 
   RECEIVE_MESSAGE
} from '../../actions/message_actions';

export default (state={}, action) => {
   Object.freeze(state);

   switch (action.type) {
      case RECEIVE_MESSAGES:
         // debugger
         return action.messages;
      case RECEIVE_MESSAGE:
         let newState = Object.assign({}, state);
         newState[action.message.id] = action.message;
         return newState;
      default:
         return state
   }
}