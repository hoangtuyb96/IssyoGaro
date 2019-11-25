class Serializers::Users::MemberGroupSerializer < Serializers::SupportSerializer
  attrs :id, :email, :name, :avatar
end
