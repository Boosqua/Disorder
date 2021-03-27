import * as APIUtil from '../util/server_api_util'
import {fetchMessages} from './message_actions'
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_CURRENT_CHANNEL = 'RECEIVE_CURRENT_CHANNEL';

export const receiveServers = (servers) => ({
   type: RECEIVE_SERVERS,
   servers
})
export const receiveCurrentChannel = (id) => ({
    type: RECEIVE_CURRENT_CHANNEL,
    id
})
export const receiveServer = (server) => ({
   type: RECEIVE_SERVER,
   server
})

export const removeServer = (serverId) => ({
   type: REMOVE_SERVER,
   serverId
})

export const receiveErrors = (errors) => ({
   type: RECEIVE_ERRORS,
   errors
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const fetchServers = (userId) => dispatch => (
   APIUtil.fetchServers(userId)
      .then(servers => dispatch(receiveServers(servers)))
)

export const fetchServer = (userId, serverId) => dispatch => (
   APIUtil.fetchServer(userId, serverId)
      .then(server => dispatch(receiveServer(server)))
      .fail(errors => dispatch(receiveErrors(errors)))
)

export const createServer = (userId, server) => dispatch => (
   APIUtil.createServer(userId, server)
      .then( server => dispatch(receiveServer(server)))
      .fail(errors => dispatch(receiveErrors(errors)))
)
export const updateServer = (userId, server) => dispatch => (
   APIUtil.updateServer(userId, server)
      .then( server => dispatch(receiveServer(server)))
      .fail(errors => dispatch(receiveErrors(errors)))
)
export const deleteServer = (userId, server) => dispatch => (
   APIUtil.deleteServer(userId, server)
      .then( server => dispatch(removeServer(server)))
      .fail(errors => dispatch(receiveErrors(errors)))
)

export const createServerMember = (serverMember) => dispatch => (
   APIUtil.createServerMember(serverMember)
      .then( data => fetchServer(data.user_id, data.server_id)(dispatch) )
      .then( () => fetchMessages(serverMember.user_id)(dispatch))
)
export const deleteServerMember = (serverMember) => dispatch => (
   APIUtil.deleteServerMember(serverMember).then( id => dispatch(removeServer(id)))
)