class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_user_#{current_user.id}"
  end

  def unsubcribed
  end
end
