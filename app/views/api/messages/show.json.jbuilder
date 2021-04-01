json.extract! @message, :id, :author_id, :body, :imageable_id, :imageable_type, :created_at
if @message.photo.attached?
   json.photoUrl url_for(@message.photo)
end