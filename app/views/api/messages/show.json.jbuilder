json.extract! @message, :id, :author_id, :body, :channel_id
json.photoUrl url_for(@message.photo)