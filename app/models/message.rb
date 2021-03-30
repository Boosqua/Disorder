class Message < ApplicationRecord
   belongs_to :imageable, polymorphic: true
   belongs_to :author, class_name: :User
   has_one_attached :photo
   
   #update friends last message time if friend message
   before_create do
      if self.imageable_type == "Friend" 
         Friend.find(self.imageable_id).update( last_message: Time.new.to_i )
      end
   end
end
