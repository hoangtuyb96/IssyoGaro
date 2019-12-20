class Serializers::Chats::ChatSerializer < Serializers::SupportSerializer
  attrs :id, :context, :user_name, :user_avatar, :user_id,
        :group_id, :user_id, :created_at

  def user_name
    object.user.name
  end

  def user_avatar
    object.user.avatar.presence ? object.user.avatar.file.filename : nil
  end

  def user_id
    object.user.id
  end

  def created_at
    ApplicationController.helpers.custom_time(object.created_at)
  end
end
