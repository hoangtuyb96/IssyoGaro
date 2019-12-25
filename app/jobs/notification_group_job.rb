class NotificationGroupJob < ApplicationJob
  queue_as :default

  def perform(receiver_id, notifications, unread_count)
    ActionCable.server.broadcast "notification_channel_#{receiver_id}",
    notifications: notifications.reverse,
    unread_count: unread_count
  end
end
