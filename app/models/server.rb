class Server < ApplicationRecord
   after_save :add_general_channel

   def add_general_channel
      Channel.create!(name: 'general', server_id: self.id)
   end

   has_many :channels
   has_many :messages, through: :channels
   belongs_to :user
end
