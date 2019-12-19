class Api::V1::NotificationsController < Api::BaseController
  def index
    @notifications = current_user.notifications.reverse
    render json: {
      data: {
        message: "Get notifications successfully",
        notifications: Serializers::Notifications::NotificationSerializer
          .new(object: notifications).serializer
      }
    }, status: 200
  end

  private

  attr_reader :notifications
end
