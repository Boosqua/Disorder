class Message < ApplicationRecord
   belongs_to :channel
   belongs_to :author, class_name: :User
end
