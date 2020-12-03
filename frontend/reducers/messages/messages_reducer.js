import {
   RECEIVE_MESSAGES, 
   RECEIVE_MESSAGE
} from '../../actions/message_actions';

export default (state={}, action) => {
   Object.freeze(state);

   switch (action.type) {
      case RECEIVE_MESSAGES:
         let messages = {}
         Object.values(action.messages).forEach( message => {
            messages[message.channel_id] ?
               messages[message.channel_id][message.id] = message:
               messages[message.channel_id] = { [message.id]: message}
         })

         return messages;
      case RECEIVE_MESSAGE:
         // debugger
         let newState = Object.assign({}, state);
         newState[action.message.channel_id] ? 
            newState[action.message.channel_id][action.message.id] = action.message :
            newState[action.message.channel_id] = { [action.message.id]: action.message}
         return newState;
      default:
         return state
   }
}