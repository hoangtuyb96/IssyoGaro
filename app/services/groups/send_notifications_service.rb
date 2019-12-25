class Groups::SendNotificationsService
  def initialize(params)
    @users = params[:users]
  end

  def perform
    @users.each do |user|
      unread_count = user.notifications.where(is_read: false).count
      NotificationGroupJob.perform_now(
        user.id,
        Serializers::Notifications::NotificationSerializer
        .new(object: user.notifications).serializer,
        unread_count
      )
    end
  end
end
