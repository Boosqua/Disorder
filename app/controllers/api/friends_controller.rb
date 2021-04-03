class Api::FriendsController < ApplicationController
   def index
      if current_user
         @friends = current_user.friendship_as + current_user.friendship_bs
         render :index
      else
         render json: ["not logged in"]
      end
   end
   def show
      @friend = Friend.find(params[:id])
      if @friend
         render :show
      else 
         render json: ["friend not found"]
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
      @friend = Friend.find(params[:id])
      if @friend && @friend.destroy
         render :show
      else 
         render json: ["something went wrong lol"], status: 401
      end
   end
   private 
   def friend_params
      params.require(:friend).permit(:friend_a_id, :friend_b_id)
   end
end