class AddTimestamps < ActiveRecord::Migration[5.2]
  def change
      change_table :friends do |t|
         t.timestamps null: true
      end
      change_table :friend_requests do |t|
         t.timestamps null: true
      end
  end
end
