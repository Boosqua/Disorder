import { receiveMessage, fetchMessage } from "./message_actions";
import {receiveFriend, receiveFriendRequest} from "./friend_actions"
import { fetchUser } from "./user_actions";
import { receiveInvite, fetchInvite } from "./invitation_actions";


export const RECEIVE_ALL_SUBSCRIPTIONS = "RECEIVE_ALL_SUBSCRIPTIONS";
export const RECEIVE_CHANNEL_SUBSCRIPTION = "RECEIVE_CHANNEL_SUBSCRIPTION";
export const RECEIVE_FRIEND_SUBSCRIPTION = "RECEIVE_FRIEND_SUBSCRIPTION";
export const RECEIVE_FRIENDSHIP_SUBSCRIPTION = "RECEIVE_FRIENDSHIP_SUBSCRIPTION";
export const RECEIVE_FRIEND_REQUEST_SUBSCRIPTION = "RECEIVE_FRIEND_REQUEST_SUBSCRIPTION";

export const receiveAllSubscriptions = (subscriptions) => ({
   type: RECEIVE_ALL_SUBSCRIPTIONS,
   subscriptions
})
export const receiveChannelSubscription = (subscription) => ({
  type: RECEIVE_CHANNEL_SUBSCRIPTION,
  subscription,
});
export const receiveFriendSubscription = (subscription) => ({
  type: RECEIVE_FRIEND_SUBSCRIPTION,
  subscription,
});
export const receiveFriendshipSubscription = (subscription) => ({
  type: RECEIVE_FRIENDSHIP_SUBSCRIPTION,
  subscription,
});
export const receiveFriendRequestSubscription = (subscription) => ({
  type: RECEIVE_FRIEND_REQUEST_SUBSCRIPTION,
  subscription,
});

export const fetchAllSubscriptions = (id) => (dispatch) => {
   const messages = App.cable.subscriptions.create({
         channel: 'MessagesChannel',
         id: id
      },
      {
         received: (data) => {
            if(!data.photoUrl){
               dispatch(receiveMessage(data))
            } else {
               fetchMessage(data.imageable_id, data.id)(dispatch)
            }
         },
      })
   const invitation = App.cable.subscriptions.create({
      channel: "ServerInvitationsChannel",
      id: id
   },
   {
      received: (data) => {
         fetchInvite(data.id)(dispatch)
      }
   })
   const friendRequestsChannel = App.cable.subscriptions.create(
     {
       channel: "FriendRequestsChannel",
       id: id,
     },
     {
       received: (data) => {
          fetchUser(data.requestor_id)(dispatch).then(
             dispatch(receiveFriendRequest(data))
          )
       },
     }
   );

   const friendChannel = App.cable.subscriptions.create(
     {
       channel: "FriendsChannel",
       id: id,
     },
     {
       received: (data) => {
          if(!data.old){
             App.cable.subscriptions.create(
               {
                 channel: "MessagesChannel",
                 type: "friendship",
                 id: data.id,
               },
               {
                 received: (data) => {
                   if (!data.photoUrl) {
                     dispatch(receiveMessage(data));
                   } else {
                     fetchMessage(data.imageable_id, data.id)(dispatch);
                   }
                 },
               }
             );
          }
         dispatch(receiveFriend(data));
       },
     }
   );
   return dispatch(
     receiveAllSubscriptions({ friendChannel: friendChannel, messages: messages, friendRequestsChannel: friendRequestsChannel, invitation: invitation})
   );
}

export const createServerSubscription = (id, serverId) => (
   App.cable.subscriptions.create({
         channel: 'MessagesChannel',
         id: id,
         server_id: serverId
      },
      {
         received: (data) => {
            if(!data.photoUrl){
               dispatch(receiveMessage(data))
            } else {
               fetchMessage(data.imageable_id, data.id)(dispatch)
            }
         },
      })
)
export const createChannelSubscription = (channelId) => (
   App.cable.subscriptions.create({
         channel: 'MessagesChannel',
         channel_id: channelId
      },
      {
         received: (data) => {
            if(!data.photoUrl){
               dispatch(receiveMessage(data))
            } else {
               fetchMessage(data.imageable_id, data.id)(dispatch)
            }
         },
      })
)