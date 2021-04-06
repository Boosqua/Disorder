class Api::MessagesController < ApplicationController
   def index
      if params[:server_id]
         @messages = Server.find(params[:server_id].to_i).get_messages
         render :index
      else
         @messages = User.find(params[:user_id].to_i).get_messages
         render :index
      end
   end

   def show
      @message = Message.find(params[:id])
      render :show
   end

   def create
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

   def destroy
      @message = Message.find(params[:id])
      @message.destroy 
      render :show
   end
   
   private
   def message_params
      params.require(:message).permit(:body, :author_id, :imageable_id, :imageable_type, :photo)
   end
end
