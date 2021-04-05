import { combineReducers } from 'redux';
import usersReducer from './users/users_reducer';
import serversReducer from './servers/servers_reducer';
import channelsReducer from './channels/channels_reducer';
import messagesReducer from './messages/messages_reducer';
import friendsReducer from "./friend_reducer";
import friendRequestsReducers from "./friend_request_reducer";
import invitationsReducer from "./invitations_reducer";

const entitiesReducer = combineReducers({
   users: usersReducer,
   servers: serversReducer,
   channels: channelsReducer,
   messages: messagesReducer,
   friends: friendsReducer,
   friendRequests: friendRequestsReducers,
   invitations: invitationsReducer
});

export default entitiesReducer;