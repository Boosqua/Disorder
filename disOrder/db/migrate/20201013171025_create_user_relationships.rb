class CreateUserRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :user_relationships do |t|
      t.integer :user_id, null: false
      t.integer :related_id, null: false
      t.string :type
      t.timestamps
    end
    add_index :user_relationships,  [:user_id, :related_id], unique: true
    add_index :user_relationships, [:user_id, :type]
  end
end
