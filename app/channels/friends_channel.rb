class FriendsChannel < ApplicationCable::Channel
   def subscribed
      stream_for "friends_#{params[:id]}"
   end
   def receive(data)
      friend = { 
         friend_a_id: data['friendAId'], 
         friend_b_id: data['friendBId']
      }
      saved_friend = Friend.create!(friend)
      FriendsChannel.broadcast_to("friends_#{saved_friend[:friend_a_id]}", saved_friend)
      FriendsChannel.broadcast_to("friends_#{saved_friend[:friend_b_id]}", saved_friend)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end