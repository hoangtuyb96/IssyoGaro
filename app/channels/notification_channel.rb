class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notification_channel"
  end

  def unsubcribed

  end
end
