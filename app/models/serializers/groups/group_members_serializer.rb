class Serializers::Groups::GroupMembersSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :cover, :users

  def users
    Serializers::UserGroups::UserGroupsIndexSerializer
      .new(object: object.user_groups).serializer
  end
end
