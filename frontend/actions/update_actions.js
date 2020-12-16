import server_members_utils from '../util/server_members_utils';
import serverMembersUtils from '../util/server_members_utils'

export const RECEIVE_UPDATE = "RECEIVE_UPDATE";
export const REMOVE_UPDATE = "REMOVE_UPDATE";
export const RECEIVE_SERVER_MEMBERS = "RECEIVE_SERVER_MEMBERS"

export const receiveUpdate = update => ({
   type: RECEIVE_UPDATE,
   update: update
});

export const removeUpdate = () => ({
   type: REMOVE_UPDATE
});

export const receiveServerMembers = serverMembers => ({
   type: RECEIVE_SERVER_MEMBERS,
   serverMembers
})

export const fetchServerMembers = (servers, users) => (dispatch) => (
      dispatch(receiveServerMembers(serverMembersUtils(servers, users)))
)