import {
   RECEIVE_CHANNELS,
   RECEIVE_CHANNEL,
   REMOVE_CHANNEL
} from '../../actions/channel_actions';

export default (state={}, action) => {
   Object.freeze(state);
   let newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_CHANNELS:
         return action.channels;
      case RECEIVE_CHANNEL:
         newState[action.channel.id] = action.channel;
         return newState;
      case REMOVE_CHANNEL:
         delete newState[action.channel.id]
         return newState;
      default:
         return state;
   }
}