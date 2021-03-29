class Friend < ApplicationRecord
   belongs_to :friend_a, foreign_key: :friend_a_id, class_name: :User
   belongs_to :friend_b, foreign_key: :friend_b_id, class_name: :User
   has_many :messages, as: :imageable
   after_initialize :unique_combo

   def unique_combo
      friend_a = self.friend_a_id
      friend_b = self.friend_b_id
      friend_a_id = friend_a < friend_b ? friend_a : friend_b
      friend_b_id = friend_a > friend_b ? friend_a : friend_b
      self.update( friend_a_id: friend_a_id, friend_b_id: friend_b_id )
   end
end