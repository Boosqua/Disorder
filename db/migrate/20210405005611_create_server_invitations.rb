class CreateServerInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :server_invitations do |t|
      t.integer :receiver_id, null: false
      t.integer :sender_id, null: false
      t.integer :server_id, null: false
      t.timestamps
    end
      add_index :server_invitations, [:receiver_id, :server_id], unique: true
  end
end
