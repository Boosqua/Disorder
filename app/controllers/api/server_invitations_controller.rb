class Api::ServerInvitationsController < ApplicationController
   def index
      @server_invites = current_user.grab_server_invites
      if @server_invites
         render :index
      else
         render json: ["No Server Invites Found"], status: 404
      end
   end

   def show
      invite = ServerInvitation.find(params[:id])
      @invite = {}
      @invite[:id] = invite[:id]
      @invite[:sender] = invite.sender
      @invite[:server] = invite.server

      render :show
   end

   def create
      invite = ServerInvitation.new(invitation_params)
      if invite.save
         @invite = {}
         @invite[:id] = invite[:id]
         @invite[:sender] = invite.sender
         @invite[:server] = invite.server
         render :show
      else 
         render json: @invite.errors.full_messages, status: 404
      end
   end

   def destroy
      @invite = ServerInvitation.find(params[:id])
      if @invite.destroy
         render json: {id: @invite[:id]}
      else
         render json: @invite.errors.full_messages, status: 404
      end
   end

   private

   def invitation_params
      params.require(:server_invitation).permit(:sender_id, :receiver_id, :server_id)
   end
end
