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
               messages[message.channel_id].push(message) :
               messages[message.channel_id] = [message]
         })
         return messages;
      case RECEIVE_MESSAGE:
         let newState = Object.assign({}, state);
         newState[action.message.channel_id].push(action.message);
         return newState;
      default:
         return state
   }
}