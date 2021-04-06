class ServerInvitationJob < ApplicationJob
  queue_as :default

  def perform(id)
      invite = ServerInvitation.find(id)
      if !!invite && redis_connected?
            invited = {}
            invited[:id] = invite[:id]
            invited[:sender] = invite.sender
            invited[:server] = invite.server
            ActionCable.server.broadcast("server_invitations_#{invite[:receiver_id]}", invited)
      end
  end
   def redis_connected?
    !!Sidekiq.redis(&:info) rescue false
  end
end
