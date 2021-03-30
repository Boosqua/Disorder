class Channel < ApplicationRecord
   belongs_to :server
   has_many :messages, as: :imageable, dependent: :destroy
   
end
