@servers.each do |server|
   json.set! server[:id] do
      json.extract! server, :id, :owner_id, :image, :name, :members
      if server[:photoUrl]
         json.photoUrl url_for(server[:photoUrl])
      end
   end
end