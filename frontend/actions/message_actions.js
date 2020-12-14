import * as APIUtil from '../util/messages_api_utils';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const receiveMessages = messages => ({
   type: RECEIVE_MESSAGES,
   messages
})

export const receiveMessage = message => ({
   type: RECEIVE_MESSAGE,
   message
})

export const deleteMessages = message => ({
   type: DELETE_MESSAGE,
   message
})
export const fetchMessages = (userId) => dispatch => (
   APIUtil.fetchMessages(userId)
      .then(messages => dispatch(receiveMessages(messages)))
      .fail(error => console.log(error))
)

export const fetchMessage = (channelId, messageId) => dispatch => (
   APIUtil.fetchMessage(channelId, messageId)
      .then(message => dispatch(receiveMessage(message)))
)

export const createMessage = (channelId, message) => dispatch => (
   APIUtil.createMessage(channelId, message)
      .then(message => dispatch(receiveMessage(message)))
)

export const updateMessage = (messageId, message) => dispatch => (
   APIUtil.updateMessage(messageId, message)
      .then(message => dispatch(receiveMessage(message)))
)

export const deleteMessage = message => dispatch => (
   APIUtil.deleteMessage(message)
      .then(message => dispatch(deleteMessages(message)))
)