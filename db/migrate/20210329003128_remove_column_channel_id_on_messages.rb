class RemoveColumnChannelIdOnMessages < ActiveRecord::Migration[5.2]
  def change
      change_table :messages do |t|
         t.remove :channel_id
         t.integer :imageable_id
         t.string  :imageable_type
      end
      add_index :messages, [:imageable_type, :imageable_id]
  end
end
