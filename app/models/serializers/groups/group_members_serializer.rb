class Serializers::Groups::GroupMembersSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :cover, :users

  def users
    Serializers::Users::MemberGroupSerializer
      .new(object: object.users).serializer
  end
end
