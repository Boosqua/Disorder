@servers.each do |server|
   json.set! server.id do
      json.extract! server, :id, :owner_id, :image, :name
   end
end