@friend_requests.each do |request|
   json.set! request.id do
      json.extract! request, :id, :requestor_id, :receiver_id
   end   
end