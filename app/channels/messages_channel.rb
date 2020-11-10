class MessagesChannel < ApplicationCable::Channel
   def subscribed
      @channel = Channel.find(params[:id])
      stream_for @channel
   end
   def receive(data)
      # debugger
      message = { author_id: data['userId'], body: data['body'], channel_id: @channel.id }
      savedMessage = Message.create!(message)
      data['id'] = savedMessage.id
      MessagesChannel.broadcast_to(@channel, data)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end
