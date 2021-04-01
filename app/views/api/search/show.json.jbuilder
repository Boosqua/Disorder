json.set! :servers do
   json.array! @servers do |server|
      json.extract! server, :id, :owner_id, :image, :name
   end
end
json.set! :users do
   json.array! @users do |user|
      json.extract! user, :id, :username, :email, :user_image
   end
end