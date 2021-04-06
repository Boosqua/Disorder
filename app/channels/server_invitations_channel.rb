class ServerInvitationsChannel < ApplicationCable::Channel
   def subscribed
      stream_from "server_invitations_#{params[:id]}"
   end
   def receive(data)
   end
   def unsubscribed
      # Any cleanup needed when channel is unsubscribed
   end
end