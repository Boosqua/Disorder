@friends.each do |friend|
   json.set! friend.id do
      json.extract! friend, :id, :friend_a_id, :friend_b_id
   end   
end