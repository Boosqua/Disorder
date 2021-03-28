class Friend < ApplicationRecord
   belongs_to :friend_a, foreign_key: :friend_a_id, class_name: :User
   belongs_to :friend_b, foreign_key: :friend_b_id, class_name: :User

end