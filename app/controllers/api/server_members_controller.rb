class Api::ServerMembersController < ApplicationController
   def create 
      @server_member = ServerMember.new(server_member_params)
      params[:user_id] = params[:server_member][:user_id]
      if @server_member.save
         render json: @server_member
      end
   end
   def destroy
      @server_member = ServerMember.find_by(server_member_params);
      if @server_member && @server_member.destroy 
         render json: @server_member.server_id
      else
         render json: "You do not belong to that channel!"
      end
   end
   private
   def server_member_params
      params.require(:server_member).permit(:user_id, :server_id)
   end
end