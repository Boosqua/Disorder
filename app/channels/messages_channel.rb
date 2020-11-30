class MessagesChannel < ApplicationCable::Channel
   def subscribed
      @channel = Channel.find(params[:id])
      stream_for @channel
   end
   def receive(data)
      # debugger
      message = { 
         author_id: data['userId'], 
         body: data['body'], 
         channel_id: data['channelId'] 
      }
      savedMessage = Message.create!(message)
      data['id'] = savedMessage.id
      MessagesChannel.broadcast_to(@channel, savedMessage)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end
