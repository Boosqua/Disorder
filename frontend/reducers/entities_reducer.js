import { combineReducers } from 'redux';
import usersReducer from './users/users_reducer';
import serversReducer from './servers/servers_reducer';
import channelsReducer from './channels/channels_reducer';
import messagesReducer from './messages/messages_reducer'

const entitiesReducer = combineReducers({
   users: usersReducer,
   servers: serversReducer,
   channels: channelsReducer,
   messages: messagesReducer
});

export default entitiesReducer;