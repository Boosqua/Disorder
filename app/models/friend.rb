class Friend < ApplicationRecord
   belongs_to :friend_a, foreign_key: :friend_a_id, class_name: :User
   belongs_to :friend_b, foreign_key: :friend_b_id, class_name: :User
   has_many :messages, as: :imageable, dependent: :destroy
   

   before_create do
         friend_as = self.friend_a_id
         friend_bs = self.friend_b_id
         friend_a_ids = friend_as < friend_bs ? friend_as : friend_bs
         friend_b_ids = friend_as > friend_bs ? friend_as : friend_bs
         self.friend_a_id = friend_a_ids
         self.friend_b_id = friend_b_ids
         self.last_message = Time.new.to_i
   end
end