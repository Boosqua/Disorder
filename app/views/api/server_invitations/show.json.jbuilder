json.extract! @invite, :id
json.set! :sender do
   json.extract! @invite[:sender], :id, :username, :email, :user_image
   if @invite[:sender].photo.attached? 
      json.photo url_for(@invite[:sender].photo)
   end
end
json.set! :server do
   json.extract! @invite[:server], :id, :owner_id, :image, :name
   if @invite[:server].photo.attached?
      json.photoUrl url_for(@invite[:server].photo)
   end
end