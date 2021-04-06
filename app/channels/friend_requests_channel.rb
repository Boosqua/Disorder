class FriendRequestsChannel < ApplicationCable::Channel
   def subscribed
      stream_for "friend_requests#{params[:id]}"
   end
   def receive(data)
      if !!data["username"]
         @user = User.where(("lower(username) LIKE '%#{data["username"].downcase}%'")).limit(1)
         if @user.length > 0
            friend_request = {
               receiver_id: @user[0][:id],
               requestor_id: data["requestor_id"]
            }
         else
            return 
         end
      else
         friend_request = { 
            requestor_id: data['requester_id'], 
            receiver_id: data['receiver_id']
         }
      end
      return if friend_request[:requestor_id] == friend_request[:receiver_id]
      saved_request = FriendRequest.create!(friend_request)
      FriendRequestsChannel.broadcast_to("friend_requests#{saved_request[:receiver_id]}", saved_request)
      
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end