class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.string :image
      t.timestamps
    end
    add_index :servers, :owner_id
  end
end
