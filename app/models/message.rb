class Message < ApplicationRecord
   belongs_to :imageable, polymorphic: true
   belongs_to :author, class_name: :User
   has_one_attached :photo
   # after_create_commit { MessageBroadcastJob.perform_later(self) }
end
