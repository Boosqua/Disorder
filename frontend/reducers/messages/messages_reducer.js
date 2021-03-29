import {
   RECEIVE_MESSAGES, 
   RECEIVE_MESSAGE,
   DELETE_MESSAGE
} from '../../actions/message_actions';

export default (state={}, action) => {
   Object.freeze(state);
   let newState = Object.assign({}, state);
   switch (action.type) {
      case RECEIVE_MESSAGES:
         let messages = {}
         Object.values(action.messages).forEach( message => {
            messages[message.imageable_id]
              ? (messages[message.imageable_id][message.id] = message)
              : (messages[message.imageable_id] = { [message.id]: message });
         })

         return messages;
      case RECEIVE_MESSAGE:
         // debugger
         
         newState[action.message.imageable_id]
           ? (newState[action.message.imageable_id][action.message.id] =
               action.message)
           : (newState[action.message.imageable_id] = {
               [action.message.id]: action.message,
             });
         return newState;

      case DELETE_MESSAGE:
         // let newState = Object.assign({}, state);
         delete newState[action.message.imageable_id][action.message.id];
         return newState
      default:
         return state
   }
}