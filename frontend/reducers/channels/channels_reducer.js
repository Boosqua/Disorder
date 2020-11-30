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
         let channels = {}
         Object.values(action.channels).forEach( channel => {
            channels[channel.server_id] ?
               channels[channel.server_id].push(channel) :
               channels[channel.server_id] = [channel]
         })
         return channels;
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