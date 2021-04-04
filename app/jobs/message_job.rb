class MessageJob < ApplicationJob
  queue_as :default

  def perform(id)
      data = Message.find(id)
      if !!data && redis_connected?
         new_message = { 
            id: data["id"],
            author_id: data['author_id'], 
            body: data['body'], 
            imageable_id: data['imageable_id'],
            imageable_type: data["imageable_type"],
            created_at: data['created_at']
         }
         new_message[:photoUrl] =  data.photo.attached?
         ActionCable.server.broadcast("server_#{new_message[:imageable_type]}#{new_message[:imageable_id]}", new_message)
         if new_message[:imageable_type] == "Friend"
            friendship = Friend.find(new_message[:imageable_id])
            friend = {
               id: friendship[:id],
               friend_a_id: friendship[:friend_a_id],
               friend_b_id: friendship[:friend_b_id],
               last_message: friendship[:last_message],
               old: true
            }
            ActionCable.server.broadcast("friends_#{friend[:friend_a_id]}", friend)
            ActionCable.server.broadcast("friends_#{friend[:friend_b_id]}", friend)
         end
      end
  end
   def redis_connected?
    !!Sidekiq.redis(&:info) rescue false
  end
end
