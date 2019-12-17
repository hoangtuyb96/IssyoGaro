class NotificationJob < ApplicationJob
  queue_as :default

  def perform
    ActionCable.server.broadcast "notification_channel", message: "test"
  end
end
