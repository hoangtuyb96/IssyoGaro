class Serializers::Notifications::NotificationSerializer <
  Serializers::SupportSerializer
  attrs :id, :context, :sender_name, :target_id,
        :notificationable_type, :notificationable_id, :is_read

  def sender_name
    object.notification_maker.name
  end
end
