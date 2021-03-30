class Server < ApplicationRecord
   after_save :add_initial_state

   def add_initial_state
      if self.channels.none? { |channel| channel.name == "general"}
         Channel.create!(name: 'general', server_id: self.id)
      end
      if self.server_memberships.none?
         ServerMember.create!(user_id: self.owner_id, server_id: self.id)
      end
   end
   has_one_attached :photo
   has_many :channels, dependent: :destroy
   has_many :messages, through: :channels
   has_many :server_memberships, 
      foreign_key: :server_id,
      class_name: :ServerMember,
      dependent: :destroy
   has_many :members,
      through: :server_memberships,
      source: :user
   belongs_to :owner, class_name: :User
end
