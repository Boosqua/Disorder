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
      if params[:server_invitation][:receiver_name] 
         @user = User.where(("lower(username) LIKE '%#{params[:server_invitation][:receiver_name].downcase}%'")).limit(1)
            
         if @user.length == 0
            render json: ["User, #{params[:server_invitation][:receiver_name]}, not found!"], status: 404
         elsif invite.update(receiver_id: @user[0][:id]) && invite.save
            @invite = {}
            @invite[:id] = invite[:id]
            @invite[:sender] = invite.sender
            @invite[:server] = invite.server
            render :show
         else
            render json: ["#{params[:server_invitation][:receiver_name]} has already received an invite!"], status: 404
         end
      elsif invite.save
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
