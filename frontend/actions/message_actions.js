import * as APIUtil from '../util/messages_api_utils';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const receiveMessages = messages => ({
   type: RECEIVE_MESSAGES,
   messages
})

export const receiveMessage = message => ({
   type: RECEIVE_MESSAGE,
   message
})

export const fetchMessages = channelId => dispatch => (
   APIUtil.fetchMessages(channelId)
      .then(messages => dispatch(receiveMessages(messages)))
)

export const fetchMessage = (channelId, messageId) => dispatch => (
   APIUtil.fetchMessage(channelId, messageId)
      .then(message => dispatch(receiveMessage(message)))
)

export const createMessage = (channelId, message) => dispatch => (
   APIUtil.createMessage(channelId, message)
      .then(message => dispatch(receiveMessage(message)))
)