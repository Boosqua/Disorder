class MessagesChannel < ApplicationCable::Channel
   def subscribed
      if params[:id]
         @channels = User.find(params[:id]).channels
         @channels.each do |channel| 
            stream_for "channel_#{channel.id}"
         end
      end
   end
   def receive(data)
      #debugger
      message = { 
         author_id: data['userId'], 
         body: data['body'], 
         imageable_id: data['imageable_id'],
         imageable_type: data["imageable_type"]
      }
      savedMessage = Message.create!(message)
      data['id'] = savedMessage.id

      MessagesChannel.broadcast_to("channel_#{savedMessage.imageable_id}", savedMessage)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end
