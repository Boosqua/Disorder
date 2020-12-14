json.extract! @message, :id, :author_id, :body, :channel_id
if @message.photo.attached?
   json.photoUrl url_for(@message.photo)
end