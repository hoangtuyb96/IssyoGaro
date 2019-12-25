class Groups::SendNotificationsService
  def initialize(params)
    @users = params[:users]
  end

  def perform
    @users.each do |user|
      NotificationGroupJob.perform_now(
        user.id,
        Serializers::Notifications::NotificationSerializer
        .new(object: user.notifications).serializer
      )
    end
  end
end
