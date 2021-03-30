class AddTimestampsAgain < ActiveRecord::Migration[5.2]
  def change
      change_table :friends do |t|
         t.string :last_message 
      end
  end
end
