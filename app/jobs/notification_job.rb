class NotificationJob < ApplicationJob
  queue_as :default

  def perform(receiver_id, notifications)
    ActionCable.server.broadcast "notification_channel_#{receiver_id}", notifications: notifications
  end
end
