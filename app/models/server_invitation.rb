class ServerInvitation < ApplicationRecord
   after_create_commit {ServerInvitationJob.perform_now self.id}
   belongs_to :server,
      foreign_key: :server_id,
      class_name: :Server
   belongs_to :receiver, 
      foreign_key: :receiver_id,
      class_name: :User
   belongs_to :sender,
      foreign_key: :sender_id,
      class_name: :User
end
