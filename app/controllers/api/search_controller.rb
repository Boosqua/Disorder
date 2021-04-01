class Api::SearchController < ApplicationController
   def show
      @servers = Server.where(("lower(name) LIKE '%#{params[:id].downcase}%'")).order(:name)
      @users = User.where(("lower(username) LIKE '%#{params[:id].downcase}%'")).order(:username)
      render :show
   end
end
