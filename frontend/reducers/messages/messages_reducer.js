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
         let messages = {Channel: {}, Friend: {}}
         let actionMessages = action.messages.Channel ? action.messages.Channel : {}
         Object.values(actionMessages).forEach( message => {
            messages.Channel[message.imageable_id]
              ? (messages.Channel[message.imageable_id][message.id] = message)
              : (messages.Channel[message.imageable_id] = { [message.id]: message });
         })
         actionMessages = action.messages.Friend ? action.messages.Friend : {}
         Object.values(actionMessages).forEach( message => {
            messages.Friend[message.imageable_id]
              ? (messages.Friend[message.imageable_id][message.id] = message)
              : (messages.Friend[message.imageable_id] = { [message.id]: message });
         })

         return messages;
      case RECEIVE_MESSAGE:
         let type = action.message.imageable_type
         newState[type][action.message.imageable_id]
           ? (newState[type][action.message.imageable_id][action.message.id] =
               action.message)
           : (newState[type][action.message.imageable_id] = {
               [action.message.id]: action.message,
             });
         return newState;

      case DELETE_MESSAGE:

         let types = action.message.imageable_type;
         delete newState[types][action.message.imageable_id][action.message.id]
         return newState
      default:
         return state
   }
}