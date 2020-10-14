class Api::ChannelsController < ApplicationController
   def show 
      @channel = Channel.find(params[:id])
   end

   def create
      @channel = Channel.new(channel_params)
      @channel.server_id = params[:server_id]

      if @channel.save
         render :show
      else
         render json: @channel.errors.full_messages, status: 401
      end
   end

   def index
      @channels = Server.find(params[:server_id]).channels
      @channels ? (render :index) : (render json: {})
   end

   def update
      @channel = Channel.find(params[:id])
      if false # || current_user == nil || server.owner_id != current_user.id
         render json: ['You do not have access to update this server']
      elsif @channel.update(channel_params)
         render :show
      else
         render json: @channel.errors.full_messages, status: 401
      end
   end
   def destroy
      @channel = Channel.find(params[:id])
      if false # || current_user == nil || server.owner_id != current_user.id
         render json: ['You do not have access to update this server']
      elsif @channel.destroy
         render :show
      else
         render json: @channel.errors.full_messages, status: 401
      end
   end

   private

   def channel_params
      params.require(:channel).permit(:name)
   end
end
