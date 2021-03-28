class MessagesChannel < ApplicationCable::Channel
   def subscribed

      if params[:id]

         @channels = User.find(params[:id]).channels
         @channels.each do |channel| 
            stream_for "chat_#{channel.id}"
         end
      end
   end
   def receive(data)
      #debugger
      message = { 
         author_id: data['userId'], 
         body: data['body'], 
         channel_id: data['channelId'] 
      }
      savedMessage = Message.create!(message)
      data['id'] = savedMessage.id
      MessagesChannel.broadcast_to("chat_#{savedMessage.channel_id}", savedMessage)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end
