class AddImmageToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :user_image, :string
  end
end
