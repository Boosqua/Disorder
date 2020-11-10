class Message < ApplicationRecord
   belongs_to :channel
   belongs_to :author, class_name: :User
   has_one_attached :photo
   # after_create_commit { MessageBroadcastJob.perform_later(self) }
end
