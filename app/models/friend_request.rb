class FriendRequest < ApplicationRecord
   belongs_to :requestor, class_name: :User
   belongs_to :receiver, class_name: :User
   after_initialize :prevent_self_add

   def prevent_self_add
      self.delete if self.requestor_id == self.receiver_id
   end
   
end