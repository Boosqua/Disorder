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
         const channel = action.channel
         let found;
         for( let i = 0; i < newState[channel.server_id].length; i++ ){
            if( newState[channel.server_id][i].id === channel.id ){
               newState[channel.server_id][i] = channel
               return newState
            }
         }
         if(!found){
            newState[channel.server_id].push(channel)
         }
         return newState;
      case REMOVE_CHANNEL:
         const serverId = action.channel.server_id;
         const deletedChannelId = action.channel.id
         const updatedChannels = newState[serverId].filter((channel) => {
            return channel.id !== deletedChannelId
         })

         newState[serverId] = updatedChannels
         return newState;
      default:
         return state;
   }
}