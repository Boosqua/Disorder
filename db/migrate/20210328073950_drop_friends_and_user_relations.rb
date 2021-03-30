class DropFriendsAndUserRelations < ActiveRecord::Migration[5.2]
  def change
   drop_table :friends
   drop_table :user_relationships
  end
end
