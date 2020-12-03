class Api::MessagesController < ApplicationController
   def index
      @messages = User.find(params[:user_id].to_i).server_messages
      render :index
   end

   def show
      @message = Message.find(params[:id])
      render :show
   end

   def create
      debugger
      @message = Message.new(message_params)
      if @message.save
         render :show
      else
         render json: @message.errors.full_messages, status: 401
      end
   end

   def update
      @message = Message.find(params[:id])
      if @message.update(message_params)
         render :show
      else 
         render json: @server.errors.full_messages, status: 401
      end
   end

   private
   def message_params
      params.require(:message).permit(:body, :author_id, :channel_id)
   end
end
