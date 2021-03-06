class Api::UsersController < ApplicationController
   def create
      @user = User.new(user_params)

      if @user.save
         login!(@user)
         render :show
      else
         render json: @user.errors.full_messages, status: 404
      end
   end
   def index 
      @users = current_user.grab_users || [];
      render :index
   end
   def show
      @user = User.find(params[:id])
      if @user
         render :show
      else
         render json: @user.errors.full_messages, status: 404
      end
   end
   def update

      @user = User.find(params[:id])
      if params[:id] == '1'
         render json: ["You are not authorized to alter this account!"], status: 403
      elsif params[:user][:delete_photo]
         @user.photo.delete
         render :show
      elsif @user.update(user_params)
         render :show
      end
   end

   def destroy
      @user = User.find(params[:id])
      if params[:id] == "1"
         render json: ["You are not authorized to delete this account!"], status: 403
      elsif @user.destroy
         render :show
      end
   end
   private 

   def user_params
      params.require(:user).permit(:username, :password, :email, :photo)
   end
end
