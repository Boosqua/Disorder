class Api::MessagesController < ApplicationController
   def index
      @messages = Channel.find(params[:channel_id]).messages
   end

   def create

   end

   private
   def message_params
      params.require(:message).permit(:body, :author_id, :channel_id)
   end
end
