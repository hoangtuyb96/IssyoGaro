class ChatJob < ApplicationJob
  queue_as :default

  def perform(chats, users)
    users.each do |user|
      channel = "chat_channel_user_" + user.id.to_s
      ActionCable.server.broadcast channel, chats: chats
    end
  end
end
