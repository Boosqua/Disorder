class Api::FriendsController < ApplicationController
   def index
      if current_user
         @friends = current_user.friends.map { |friend|  }
         render json: @friends
      else
         render json: ["not logged in"]
      end
   end

   def create
      @friendship = Friend.new(friend_params)
      if @friendship.save
         render json: @friendship
      else
         render json: @friendship.errors.full_messages, status: 401
      end
   end
   def destroy 
      @friends = current_user.find_friendship(params[:friend][:id])
      if @friends && @friends.destroy
         render json: @friends
      else 
         render json: ["something went wrong lol"], status: 401
      end
   end
   private 
   def friend_params
      params.require(:friend).permit(:friend_a_id, :friend_b_id)
   end
end