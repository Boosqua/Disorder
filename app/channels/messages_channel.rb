class MessagesChannel < ApplicationCable::Channel
   def subscribed
      if params[:type] == "friendship" #subscriptions for new friendships
         stream_from "server_Friend#{params[:id]}"
      elsif params[:server_id] #subscription for joining or creating new servers
         @channels = Server.find(params[:server_id]).channels
         @channels.each do |channel|
            stream_from "server_Channel#{channel.id}"
         end
      elsif params[:channel_id] #subscriptions when creating a new channel
         stream_from "server_Channel#{params[:channel_id]}"
      elsif params[:id] # general subscriptions for channels and friends
         @user = User.find(params[:id])
         @channels = @user.channels
         @channels.each do |channel| 
            stream_from "server_Channel#{channel.id}"
         end
         @friends = @user.friendship_as + @user.friendship_bs
         @friends.each do |channel| 
            stream_from "server_Friend#{channel.id}"
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
   end
   def unsubscribed

   end
end
