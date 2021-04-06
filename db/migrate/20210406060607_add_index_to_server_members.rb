class AddIndexToServerMembers < ActiveRecord::Migration[5.2]
  def change
   add_index :server_members, [:user_id, :server_id], unique: true
  end
end
