class Api::V1::NotificationsController < Api::BaseController
  def index
    @notifications = current_user.notifications
    render json: {
      data: {
        message: "Get notifications successfully",
        unread_count: notifications.where(is_read: false).count,
        notifications: Serializers::Notifications::NotificationSerializer
          .new(object: notifications.reverse).serializer
      }
    }, status: 200
  end

  private

  attr_reader :notifications
end
