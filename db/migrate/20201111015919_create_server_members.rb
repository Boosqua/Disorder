class CreateServerMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :server_members do |t|
      t.belongs_to :user
      t.belongs_to :server
      t.timestamps
    end
  end
end
