json.extract! @server, :id, :owner_id, :image, :name, :members
if @server[:photoUrl]
   json.photoUrl url_for(@server[:photoUrl])
end