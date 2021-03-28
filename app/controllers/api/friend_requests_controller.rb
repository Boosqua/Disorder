class Api::FriendRequestsController < ApplicationController
   def index
      if current_user
         @friend_requests = current_user.friend_requests_as_receiver
         render json: @friend_requests
      else
         render json: ["not logged in"]
      end
   end

   def create
      @friend_request = FriendRequest.new(friend_params)
      if @friend_request.save
         render json: @friend_request
      else
         render json: @friend_request.errors.full_messages, status: 401
      end
   end
   def destroy 
      @friend_request = FriendRequest.find(params[:id])
      if @friend_request && @friend_request.destroy
         render json: @friend_request
      else 
         render json: ["something went wrong lol"], status: 401
      end
   end
   private 
   def friend_params
      params.require(:friend_request).permit(:requestor_id, :receiver_id)
   end
end