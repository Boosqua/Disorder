class MessagesChannel < ApplicationCable::Channel
   def subscribed
      if params[:id]
         @user = User.find(params[:id])
         @channels = @user.channels
         @channels.each do |channel| 
            stream_for "server_Channel#{channel.id}"
         end
         @friends = @user.friendship_as + @user.friend_bs
         @friends.each do |channel| 
            stream_for "server_Friend#{channel.id}"
         end
      end
   end
   def receive(data)
      message = { 
         author_id: data['userId'], 
         body: data['body'], 
         imageable_id: data['imageable_id'],
         imageable_type: data["imageable_type"]
      }

      savedMessage = Message.create!(message)
      MessagesChannel.broadcast_to("server_#{savedMessage.imageable_type}#{savedMessage.imageable_id}", savedMessage)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end
