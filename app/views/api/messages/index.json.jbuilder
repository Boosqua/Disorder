@messages.each do |message|
   json.set! message.id do
      json.extract! message, :id, :author_id, :body, :channel_id
   end
end