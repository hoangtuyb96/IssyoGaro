class Serializers::Requests::RequestsSerializer <
  Serializers::SupportSerializer
  attrs :id, :user_id, :group_id, :user_name, :is_approve

  def user_name
    object.user.name
  end
end
