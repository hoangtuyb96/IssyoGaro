class NotificationJob < ApplicationJob
  queue_as :default

  def perform(current_user)
    ActionCable.server.broadcast "notification_channel_#{current_user.id}", message: "test"
  end
end
