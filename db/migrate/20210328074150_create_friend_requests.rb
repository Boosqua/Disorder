class CreateFriendRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :friend_requests do |t|
      t.integer :requestor_id
      t.integer :receiver_id
      t.index :receiver_id
      t.index :requestor_id
    end
    create_table :friends do |t|
      t.integer :friend_a_id
      t.integer :friend_b_id
      t.index :friend_a_id
      t.index :friend_b_id
    end
      add_index :friends, [:friend_a_id, :friend_b_id], unique: true
      add_index :friend_requests, [:requestor_id, :receiver_id], unique: true
  end
end
