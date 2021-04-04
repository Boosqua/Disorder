import * as APIUtil from '../util/channel_api_util';
import { createChannelSubscription } from './actioncable_actions';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveChannels = (channels) => ({
   type: RECEIVE_CHANNELS,
   channels
});

export const receiveChannel = (channel) => ({
   type: RECEIVE_CHANNEL,
   channel
});

export const removeChannel = (channel) => ({
   type: REMOVE_CHANNEL,
   channel
});

export const receiveErrors = (errors) => ({
   type: RECEIVE_ERRORS,
   errors
});

export const clearErrors = () => ({
   type: CLEAR_ERRORS
});

export const fetchChannels = (serverId) => (dispatch) => (
   APIUtil.fetchChannels(serverId)
      .then( channels => dispatch(receiveChannels(channels)))
      .fail( errors => dispatch(receiveErrors(errors)) )
);

export const fetchChannel = (serverId, channelId) => (dispatch) => (
   APIUtil.fetchChannel(serverId, channelId)
      .then( channel => dispatch(receiveChannel(channel)))
      .fail( errors => dispatch(receiveErrors(errors)) )
);

export const createChannel = (serverId, channel) => (dispatch) => (
   APIUtil.createChannel(serverId, channel)
      .then( channel => {
         createChannelSubscription(channel.id)
         return dispatch(receiveChannel(channel))
      })
      .fail( errors => dispatch(receiveErrors(errors)) )
);

export const updateChannel = (serverId, channel) => (dispatch) => (
   APIUtil.updateChannel(serverId, channel)
      .then( channel => dispatch(receiveChannel(channel)))
      .fail( errors => dispatch(receiveErrors(errors)) )
);

export const deleteChannel = (serverId, channelId) => (dispatch) => (
   APIUtil.deleteChannel(serverId, channelId)
      .then( channel => dispatch(removeChannel(channel)))
      .fail( errors => dispatch(receiveErrors(errors)) )
);

