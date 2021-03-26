@messages.each do |message|
   json.set! message.id do
      json.extract! message, :id, :author_id, :body, :created_at, :channel_id
      if message.photo.attached?
         json.photoUrl url_for(message.photo)
      end
   end   
end