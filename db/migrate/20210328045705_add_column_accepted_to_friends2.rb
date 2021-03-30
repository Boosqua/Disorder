class AddColumnAcceptedToFriends2 < ActiveRecord::Migration[5.2]
  def change
   add_column :friends, :accepted, :boolean
  end
end
