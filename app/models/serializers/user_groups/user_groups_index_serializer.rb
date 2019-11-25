class Serializers::UserGroups::UserGroupsIndexSerializer <
  Serializers::SupportSerializer
  attrs :id, :role, :user_info

  def user_info
    Serializers::Users::MemberGroupSerializer
      .new(object: object.user).serializer
  end
end
