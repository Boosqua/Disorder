class MessageJob < ApplicationJob
  queue_as :default

  def perform(id)
      data = Message.find(id)
      if !!data 
         new_message = { 
            id: data["id"],
            author_id: data['author_id'], 
            body: data['body'], 
            imageable_id: data['imageable_id'],
            imageable_type: data["imageable_type"]
         }
         new_message[:photoUrl] =  data.photo.attached?
         ActionCable.server.broadcast("server_#{new_message[:imageable_type]}#{new_message[:imageable_id]}", new_message)
      end
  end
end
