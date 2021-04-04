@users.each do |user|
   json.set! user[:id] do
      json.extract! user, :id, :username, :email, :user_image
      if user.photo.attached?
         json.photo url_for(user.photo)
      end
   end
end