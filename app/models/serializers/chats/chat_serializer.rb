class Serializers::Chats::ChatSerializer < Serializers::SupportSerializer
  attrs :id, :context, :user_name, :group_id, :user_id, :created_at

  def user_name
    object.user.name
  end

  def created_at
    ApplicationController.helpers.custom_time(object.created_at)
  end
end
