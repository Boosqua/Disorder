class Api::ServersController < ApplicationController
   def show
      @server = Server.find(params[:id])
   end

   def create
      @server = Server.new(server_params)
      @server.owner_id = params[:user_id]
      if @server.save
         render :show
      else
         render json: @server.errors.full_messages, status: 404
      end
   end

   def index
      @servers = Server.all
      if @servers
         render :index
      else
         render json: ["No servers found"], status: 404
      end
   end
   def update
      @server = Server.find(params[:id])
      if false # || current_user == nil || server.owner_id != current_user.id
         render json: ['You do not have access to update this server'], status: 404
      elsif @server.update(server_params)
         render :show
      else 
         render json: @server.errors.full_messages, status: 404
      end
   end

   def destroy
      @server = Server.find(params[:id])
      if false # || current_user == nil || server.owner_id != current_user.id
         render json: ['You do not have access to update this server'], status: 404
      elsif @server.destroy
         render :index
      else 
         render json: @server.errors.full_messages, status: 404
      end
   
   end
   private 
   def server_params
      params.require(:server).permit(:name, :image)
   end
end