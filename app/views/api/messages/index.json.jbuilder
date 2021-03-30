
json.set! :Channel do 
   @messages[:channels].each do |message|
      json.set! message.id do
         json.extract! message, :id, :author_id, :body, :created_at, :imageable_id, :imageable_type
         if message.photo.attached?
            json.photoUrl url_for(message.photo)
         end
      end   
   end
end

json.set! :Friend do
   @messages[:friends].each do |message|
      json.set! message.id do
         json.extract! message, :id, :author_id, :body, :created_at, :imageable_id, :imageable_type
         if message.photo.attached?
            json.photoUrl url_for(message.photo)
         end
      end   
   end
end